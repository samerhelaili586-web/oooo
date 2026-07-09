import os
import random
import smtplib
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from functools import wraps
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

app = Flask(__name__)

# Secret key for signing the admin session cookie. MUST be set to a long random
# value via env var in production — the fallback is only for local dev.
app.secret_key = os.environ.get('SECRET_KEY', 'dev-only-change-me')
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = os.environ.get('SESSION_COOKIE_SECURE', 'False') == 'True'

# CORS: restrict to configured origin(s) in production; defaults to allow-all for local dev.
# supports_credentials is required so the browser sends/keeps the admin session cookie.
ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS', '*')
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": ALLOWED_ORIGINS.split(',') if ALLOWED_ORIGINS != '*' else '*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- EMAIL (used for the admin "forgot password" reset code) ---
# Uses the admin's own Gmail account as the sender via an App Password
# (Google Account -> Security -> 2-Step Verification -> App passwords).
# Never use the normal Gmail login password here.
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER')          # the admin's Gmail address
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')  # the 16-char Gmail App Password


def send_email(to_address, subject, body):
    if not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError('SMTP_USER / SMTP_PASSWORD not configured on the server.')
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = SMTP_USER
    msg['To'] = to_address
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, [to_address], msg.as_string())


def admin_required(view_func):
    """Guards every /api/admin/* route: caller must hold a valid admin session cookie."""
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        if not session.get('admin_id'):
            return jsonify({"status": "error", "message": "Authentification requise."}), 401
        return view_func(*args, **kwargs)
    return wrapper


def ensure_priority_column():
    """Add the 'priority' column to pre-existing SQLite databases that predate this field."""
    try:
        with db.engine.connect() as conn:
            cols = [row[1] for row in conn.exec_driver_sql("PRAGMA table_info(tasks)").fetchall()]
            if 'priority' not in cols:
                conn.exec_driver_sql("ALTER TABLE tasks ADD COLUMN priority VARCHAR(20) DEFAULT 'Normale'")
                conn.commit()
    except Exception:
        pass


def ensure_reset_code_columns():
    """Add the password-reset columns to pre-existing SQLite databases."""
    try:
        with db.engine.connect() as conn:
            cols = [row[1] for row in conn.exec_driver_sql("PRAGMA table_info(users)").fetchall()]
            if 'reset_code_hash' not in cols:
                conn.exec_driver_sql("ALTER TABLE users ADD COLUMN reset_code_hash VARCHAR(200)")
            if 'reset_code_expires' not in cols:
                conn.exec_driver_sql("ALTER TABLE users ADD COLUMN reset_code_expires DATETIME")
            conn.commit()
    except Exception:
        pass


def is_date_in_past(date_str):
    """Reject dates strictly before today (format expected: YYYY-MM-DD, from <input type=date>)."""
    if not date_str:
        return False
    today_str = datetime.now().strftime('%Y-%m-%d')
    return date_str < today_str

# --- DATABASE MODELS ---
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    unique_code = db.Column(db.String(50), unique=True, nullable=True)
    role = db.Column(db.String(20), default='employee')
    sub_role = db.Column(db.String(20), default='prod')

    email = db.Column(db.String(100), unique=True, nullable=True)
    password = db.Column(db.String(100), nullable=True)

    reset_code_hash = db.Column(db.String(200), nullable=True)
    reset_code_expires = db.Column(db.DateTime, nullable=True)

    tasks = db.relationship('Task', backref='assigned_user', lazy=True)


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(50), default='En attente')

    started_at = db.Column(db.String(50), nullable=True)
    finished_at = db.Column(db.String(50), nullable=True)
    is_self_created = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String(20), default='Normale')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    assigned_to_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    comments = db.relationship('Comment', backref='associated_task', lazy=True, cascade="all, delete-orphan")


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(50), default=lambda: datetime.now().strftime("%H:%M"))
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)


class ScheduleEntry(db.Model):
    """A single logged task within one of the day's two work shifts
    (08:30-13:00 morning / 14:00-17:30 afternoon), used by the employee's
    daily planning table."""
    __tablename__ = 'schedule_entries'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)         # 'YYYY-MM-DD'
    start_time = db.Column(db.String(5), nullable=False)    # 'HH:MM' 24h
    end_time = db.Column(db.String(5), nullable=False)      # 'HH:MM' 24h
    title = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Notification(db.Model):
    """In-app notification for an employee (e.g. a new shooting was assigned)."""
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(300), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=True)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


def create_notification(user_id, message, task_id=None):
    db.session.add(Notification(user_id=user_id, message=message, task_id=task_id))


# --- SEED HELPERS ---
def seed_initial_accounts():
    """Pre-seed test accounts so the tables compile smoothly on first init."""
    if not User.query.filter_by(unique_code='789').first():
        db.session.add(User(
            name="Sami Prod",
            unique_code="789",
            role="employee",
            sub_role="prod"
        ))
    if not User.query.filter_by(unique_code='123').first():
        db.session.add(User(
            name="Hana CM",
            unique_code="123",
            role="employee",
            sub_role="cm"
        ))
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@yalla.com')
    if not User.query.filter_by(role='admin').first():
        default_admin_password = os.environ.get('DEFAULT_ADMIN_PASSWORD', 'yalla')
        db.session.add(User(
            name="Direction Générale",
            role="admin",
            email=admin_email,
            password=generate_password_hash(default_admin_password)
        ))
    db.session.commit()


# --- API ROUTES ---
@app.route('/api/verify/<string:code>', methods=['GET'])
def verify_code(code):
    user = User.query.filter_by(unique_code=code, role='employee').first()
    if user:
        return jsonify({
            "status": "success",
            "role": user.role,
            "sub_role": user.sub_role,
            "user_id": user.id,
            "name": user.name
        }), 200
    return jsonify({"status": "error", "message": "Code unique incorrect."}), 404


@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password') or ''
    admin = User.query.filter_by(email=email, role='admin').first()

    if not admin or not admin.password:
        return jsonify({"status": "error", "message": "Identifiants administratifs incorrects."}), 401

    # Werkzeug hashes always contain a ':' separator (e.g. "pbkdf2:sha256:..."). Anything
    # else is a legacy plaintext password from before hashing was added — migrate it
    # transparently on successful login instead of locking existing accounts out.
    is_hashed = ':' in admin.password
    if is_hashed:
        valid = check_password_hash(admin.password, password)
    else:
        valid = admin.password == password
        if valid:
            admin.password = generate_password_hash(password)
            db.session.commit()

    if valid:
        session['admin_id'] = admin.id
        return jsonify({"status": "success", "role": "admin", "name": admin.name}), 200
    return jsonify({"status": "error", "message": "Identifiants administratifs incorrects."}), 401


@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin_id', None)
    return jsonify({"status": "success"}), 200


@app.route('/api/admin/forgot-password', methods=['POST'])
def admin_forgot_password():
    """Sends a 6-digit reset code to the admin's own email (valid 15 minutes)."""
    data = request.json or {}
    email = (data.get('email') or '').strip()
    admin = User.query.filter_by(email=email, role='admin').first()

    # Always return the same generic response whether or not the email matched,
    # so this endpoint can't be used to check which emails are registered admins.
    generic_response = jsonify({
        "status": "success",
        "message": "Si cet email est enregistré, un code a été envoyé."
    }), 200

    if not admin:
        return generic_response

    code = f"{random.randint(0, 999999):06d}"
    admin.reset_code_hash = generate_password_hash(code)
    admin.reset_code_expires = datetime.utcnow() + timedelta(minutes=15)
    db.session.commit()

    try:
        send_email(
            admin.email,
            "YALLA — Code de réinitialisation",
            f"Votre code de réinitialisation est : {code}\n\nCe code expire dans 15 minutes. "
            f"Si vous n'avez pas demandé ce changement, ignorez cet email."
        )
    except Exception:
        # Don't leak SMTP errors to the client; the admin can retry, and the
        # generic response below avoids revealing whether sending failed.
        pass

    return generic_response


@app.route('/api/admin/reset-password', methods=['POST'])
def admin_reset_password():
    data = request.json or {}
    email = (data.get('email') or '').strip()
    code = (data.get('code') or '').strip()
    new_password = data.get('new_password') or ''

    if len(new_password) < 8:
        return jsonify({"status": "error", "message": "Le mot de passe doit contenir au moins 8 caractères."}), 400

    admin = User.query.filter_by(email=email, role='admin').first()
    if (not admin or not admin.reset_code_hash or not admin.reset_code_expires
            or admin.reset_code_expires < datetime.utcnow()
            or not check_password_hash(admin.reset_code_hash, code)):
        return jsonify({"status": "error", "message": "Code invalide ou expiré."}), 400

    admin.password = generate_password_hash(new_password)
    admin.reset_code_hash = None
    admin.reset_code_expires = None
    db.session.commit()
    return jsonify({"status": "success", "message": "Mot de passe mis à jour."}), 200


@app.route('/api/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    """Most recent 30 notifications for this employee, newest first."""
    notifs = (Notification.query
              .filter_by(user_id=user_id)
              .order_by(Notification.created_at.desc())
              .limit(30).all())
    unread_count = Notification.query.filter_by(user_id=user_id, is_read=False).count()
    return jsonify({
        "unread_count": unread_count,
        "notifications": [{
            "id": n.id,
            "message": n.message,
            "task_id": n.task_id,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat()
        } for n in notifs]
    }), 200


@app.route('/api/notifications/<int:notif_id>/read', methods=['POST'])
def mark_notification_read(notif_id):
    notif = Notification.query.get_or_404(notif_id)
    notif.is_read = True
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/notifications/<int:user_id>/read-all', methods=['POST'])
def mark_all_notifications_read(user_id):
    Notification.query.filter_by(user_id=user_id, is_read=False).update({"is_read": True})
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/tasks/<int:user_id>', methods=['GET'])
def get_user_tasks(user_id):
    tasks = Task.query.filter_by(assigned_to_id=user_id).all()
    output = []
    for t in tasks:
        output.append({
            "id": t.id,
            "title": t.title,
            "description": t.description if t.description else "",
            "status": t.status,
            "date": t.date if t.date else "",
            "started_at": getattr(t, 'started_at', "") or "",
            "finished_at": getattr(t, 'finished_at', "") or "",
            "is_self_created": getattr(t, 'is_self_created', False),
            "priority": getattr(t, 'priority', None) or 'Normale',
            "comments": [{"id": c.id, "text": c.text, "time": c.timestamp} for c in t.comments]
        })
    return jsonify(output), 200


@app.route('/api/tasks/employee-create', methods=['POST'])
def employee_create_task():
    data = request.json or {}
    title = (data.get('title') or '').strip()
    if not title:
        return jsonify({"status": "error", "message": "Le titre est requis."}), 400
    try:
        user_id = int(data.get('user_id'))
    except (TypeError, ValueError):
        return jsonify({"status": "error", "message": "Utilisateur invalide."}), 400
    if not User.query.get(user_id):
        return jsonify({"status": "error", "message": "Utilisateur introuvable."}), 404
    if is_date_in_past(data.get('date')):
        return jsonify({"status": "error", "message": "La date ne peut pas être antérieure à aujourd'hui."}), 400

    new_task = Task(
        title=title,
        description=data.get('description'),
        date=data.get('date'),
        assigned_to_id=user_id,
        status="En attente",
        started_at="",
        finished_at="",
        is_self_created=True,
        priority=data.get('priority') or 'Normale'
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"status": "success"}), 201


@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def employee_delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"status": "success"}), 200


# --- Daily schedule table (two work shifts: 08:30-13:00 / 14:00-17:30) ---
SHIFTS = [("08:30", "13:00"), ("14:00", "17:30")]


def _time_to_minutes(hhmm):
    h, m = hhmm.split(':')
    return int(h) * 60 + int(m)


def _entry_shift_violation(start_time, end_time):
    """Returns an error message if the entry isn't valid or doesn't fit
    entirely inside one of the two work shifts, else None."""
    try:
        start_m, end_m = _time_to_minutes(start_time), _time_to_minutes(end_time)
    except (ValueError, AttributeError):
        return "Heures invalides."
    if end_m <= start_m:
        return "L'heure de fin doit être après l'heure de début."
    for shift_start, shift_end in SHIFTS:
        if _time_to_minutes(shift_start) <= start_m and end_m <= _time_to_minutes(shift_end):
            return None
    return "La tâche doit être entièrement comprise dans un créneau : 08:30–13:00 ou 14:00–17:30."


@app.route('/api/schedule/<int:user_id>', methods=['GET'])
def get_schedule_entries(user_id):
    date = request.args.get('date')
    if not date:
        return jsonify({"status": "error", "message": "Le paramètre date est requis."}), 400
    entries = ScheduleEntry.query.filter_by(user_id=user_id, date=date).order_by(ScheduleEntry.start_time.asc()).all()
    return jsonify([{
        "id": e.id, "date": e.date, "start_time": e.start_time, "end_time": e.end_time, "title": e.title
    } for e in entries]), 200


@app.route('/api/schedule', methods=['POST'])
def create_schedule_entry():
    data = request.json or {}
    title = (data.get('title') or '').strip()
    date = data.get('date')
    start_time = data.get('start_time')
    end_time = data.get('end_time')

    if not title:
        return jsonify({"status": "error", "message": "La description de la tâche est requise."}), 400
    if not date:
        return jsonify({"status": "error", "message": "La date est requise."}), 400
    try:
        user_id = int(data.get('user_id'))
    except (TypeError, ValueError):
        return jsonify({"status": "error", "message": "Utilisateur invalide."}), 400
    if not User.query.get(user_id):
        return jsonify({"status": "error", "message": "Utilisateur introuvable."}), 404

    violation = _entry_shift_violation(start_time, end_time)
    if violation:
        return jsonify({"status": "error", "message": violation}), 400

    # Prevent overlapping entries for the same user/day.
    new_start, new_end = _time_to_minutes(start_time), _time_to_minutes(end_time)
    for e in ScheduleEntry.query.filter_by(user_id=user_id, date=date).all():
        e_start, e_end = _time_to_minutes(e.start_time), _time_to_minutes(e.end_time)
        if new_start < e_end and e_start < new_end:
            return jsonify({"status": "error", "message": f"Chevauchement avec « {e.title} » ({e.start_time}–{e.end_time})."}), 409

    entry = ScheduleEntry(user_id=user_id, date=date, start_time=start_time, end_time=end_time, title=title)
    db.session.add(entry)
    db.session.commit()
    return jsonify({"status": "success", "id": entry.id}), 201


@app.route('/api/schedule/<int:entry_id>', methods=['DELETE'])
def delete_schedule_entry(entry_id):
    entry = ScheduleEntry.query.get_or_404(entry_id)
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"status": "success"}), 200


def _time_in_any_shift(hhmm):
    try:
        m = _time_to_minutes(hhmm)
    except (ValueError, AttributeError, TypeError):
        return False
    return any(_time_to_minutes(s) <= m <= _time_to_minutes(e) for s, e in SHIFTS)


@app.route('/api/tasks/<int:task_id>/metrics', methods=['PUT'])
def update_task_metrics(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json or {}

    # Editing the shooting's core details (title/description/date/priority)
    # is locked once the shooting's date is in the past — status and time
    # tracking stay editable so people can still close out yesterday's work.
    editing_core_fields = any(k in data for k in ('title', 'description', 'date'))
    if editing_core_fields and task.date and task.date < datetime.utcnow().strftime('%Y-%m-%d'):
        return jsonify({"status": "error", "message": "Impossible de modifier un shooting dont la date est passée."}), 403

    # Resolve what started_at/finished_at would become after this update,
    # without committing yet, so we can validate the full picture first.
    next_started = data.get('started_at') if 'started_at' in data else task.started_at
    next_finished = data.get('finished_at') if 'finished_at' in data else task.finished_at

    if 'started_at' in data and next_started and not _time_in_any_shift(next_started):
        return jsonify({"status": "error", "message": "L'heure de début doit être comprise entre 08:30–13:00 ou 14:00–17:30."}), 400
    if 'finished_at' in data and next_finished and not _time_in_any_shift(next_finished):
        return jsonify({"status": "error", "message": "L'heure de fin doit être comprise entre 08:30–13:00 ou 14:00–17:30."}), 400
    if next_started and next_finished:
        violation = _entry_shift_violation(next_started, next_finished)
        if violation:
            return jsonify({"status": "error", "message": violation}), 400

    if 'status' in data: task.status = data.get('status')
    if 'started_at' in data: task.started_at = next_started
    if 'finished_at' in data: task.finished_at = next_finished
    if 'priority' in data: task.priority = data.get('priority')
    if 'title' in data:
        title = (data.get('title') or '').strip()
        if not title:
            return jsonify({"status": "error", "message": "Le titre ne peut pas être vide."}), 400
        task.title = title
    if 'description' in data: task.description = data.get('description')
    if 'date' in data:
        new_date = data.get('date')
        if new_date and new_date < datetime.utcnow().strftime('%Y-%m-%d'):
            return jsonify({"status": "error", "message": "Impossible de déplacer un shooting vers une date passée."}), 400
        task.date = new_date
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/tasks/<int:task_id>/comment', methods=['POST'])
def add_task_comment(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json or {}
    comment_text = data.get('comment', '').strip()
    if not comment_text: return jsonify({"status": "error"}), 400
    new_comment = Comment(text=comment_text, task_id=task.id)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"status": "success"}), 201


@app.route('/api/comments/<int:comment_id>', methods=['PUT', 'DELETE'])
def handle_comment_actions(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if request.method == 'DELETE':
        db.session.delete(comment)
    elif request.method == 'PUT':
        comment.text = (request.json or {}).get('text', comment.text)
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/admin/users', methods=['GET', 'POST'])
@admin_required
def handle_admin_users():
    if request.method == 'POST':
        data = request.json or {}
        name = (data.get('name') or '').strip()
        unique_code = (data.get('unique_code') or '').strip()
        if not name or not unique_code:
            return jsonify({"status": "error", "message": "Le nom et le code d'accès sont requis."}), 400
        if User.query.filter_by(unique_code=unique_code).first():
            return jsonify({"status": "error", "message": "Code déjà utilisé"}), 400
        db.session.add(User(
            name=name,
            unique_code=unique_code,
            sub_role=data.get('sub_role', 'prod'),
            role='employee'
        ))
        db.session.commit()
        return jsonify({"status": "success"}), 201
    employees = User.query.filter_by(role='employee').all()
    return jsonify([{"id": u.id, "name": u.name, "unique_code": u.unique_code, "sub_role": u.sub_role} for u in employees]), 200


@app.route('/api/admin/users/<int:user_id>', methods=['PUT', 'DELETE'])
@admin_required
def update_or_delete_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'DELETE':
        # Loop through and delete tasks cleanly to trigger cascade handlers on child comments,
        # preventing SQLite ForeignKeyConstraint / IntegrityError exceptions.
        user_tasks = Task.query.filter_by(assigned_to_id=user_id).all()
        for t in user_tasks:
            db.session.delete(t)
        db.session.delete(user)
    elif request.method == 'PUT':
        data = request.json or {}
        user.name = data.get('name')
        user.unique_code = data.get('unique_code')
        user.sub_role = data.get('sub_role', 'prod')
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/admin/tasks', methods=['GET', 'POST'])
@admin_required
def handle_admin_tasks():
    if request.method == 'POST':
        data = request.json or {}
        title = (data.get('title') or '').strip()
        if not title:
            return jsonify({"status": "error", "message": "Le titre est requis."}), 400
        try:
            assigned_to_id = int(data.get('assigned_to_id'))
        except (TypeError, ValueError):
            return jsonify({"status": "error", "message": "Opérateur invalide."}), 400
        if not User.query.get(assigned_to_id):
            return jsonify({"status": "error", "message": "Opérateur introuvable."}), 404
        if is_date_in_past(data.get('date')):
            return jsonify({"status": "error", "message": "La date ne peut pas être antérieure à aujourd'hui."}), 400

        new_task = Task(
            title=title,
            description=data.get('description'),
            date=data.get('date'),
            assigned_to_id=assigned_to_id,
            is_self_created=False,
            priority=data.get('priority') or 'Normale'
        )
        db.session.add(new_task)
        db.session.flush()  # get new_task.id before commit
        create_notification(
            assigned_to_id,
            f"Nouveau shooting assigné : « {title} »" + (f" — {data.get('date')}" if data.get('date') else ""),
            task_id=new_task.id
        )
        db.session.commit()
        return jsonify({"status": "success"}), 201
    all_tasks = Task.query.all()
    return jsonify([{
        "id": t.id, "title": t.title, "description": t.description, "status": t.status, "date": t.date,
        "started_at": getattr(t, 'started_at', "") or "", "finished_at": getattr(t, 'finished_at', "") or "",
        "priority": getattr(t, 'priority', None) or 'Normale',
        "comments": [{"id": c.id, "text": c.text, "time": c.timestamp} for c in t.comments],
        "assigned_to_id": t.assigned_to_id,
        "assigned_to": f"{t.assigned_user.name} ({t.assigned_user.sub_role.upper()})" if t.assigned_user else "Inconnu"
    } for t in all_tasks]), 200


@app.route('/api/admin/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
@admin_required
def update_or_delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if request.method == 'DELETE':
        db.session.delete(task)
    elif request.method == 'PUT':
        data = request.json or {}
        title = (data.get('title') or '').strip()
        if not title:
            return jsonify({"status": "error", "message": "Le titre est requis."}), 400
        try:
            assigned_to_id = int(data.get('assigned_to_id'))
        except (TypeError, ValueError):
            return jsonify({"status": "error", "message": "Opérateur invalide."}), 400
        if not User.query.get(assigned_to_id):
            return jsonify({"status": "error", "message": "Opérateur introuvable."}), 404

        task.title = title
        task.description = data.get('description')
        task.date = data.get('date')
        if assigned_to_id != task.assigned_to_id:
            create_notification(
                assigned_to_id,
                f"Shooting réassigné : « {title} »" + (f" — {data.get('date')}" if data.get('date') else ""),
                task_id=task.id
            )
        task.assigned_to_id = assigned_to_id
        if 'priority' in data: task.priority = data.get('priority') or 'Normale'
    db.session.commit()
    return jsonify({"status": "success"}), 200


@app.route('/api/admin/stats', methods=['GET'])
@admin_required
def get_admin_stats():
    """Aggregate analytics used by the new Analytics dashboard tab."""
    all_tasks = Task.query.all()
    today_str = datetime.now().strftime('%Y-%m-%d')

    total = len(all_tasks)
    completed = sum(1 for t in all_tasks if t.status == 'Terminé')
    in_progress = sum(1 for t in all_tasks if t.status == 'En cours')
    pending = sum(1 for t in all_tasks if t.status == 'En attente')
    overdue = sum(1 for t in all_tasks if t.date and t.date < today_str and t.status != 'Terminé')

    priority_breakdown = {}
    for t in all_tasks:
        p = getattr(t, 'priority', None) or 'Normale'
        priority_breakdown[p] = priority_breakdown.get(p, 0) + 1

    per_employee = []
    employees = User.query.filter_by(role='employee').all()
    for u in employees:
        u_tasks = [t for t in all_tasks if t.assigned_to_id == u.id]
        u_completed = sum(1 for t in u_tasks if t.status == 'Terminé')
        per_employee.append({
            "id": u.id,
            "name": u.name,
            "sub_role": u.sub_role,
            "total": len(u_tasks),
            "completed": u_completed,
            "completion_rate": round((u_completed / len(u_tasks)) * 100) if u_tasks else 0
        })

    completion_rate = round((completed / total) * 100) if total else 0

    return jsonify({
        "total": total,
        "completed": completed,
        "in_progress": in_progress,
        "pending": pending,
        "overdue": overdue,
        "completion_rate": completion_rate,
        "priority_breakdown": priority_breakdown,
        "per_employee": per_employee
    }), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        ensure_priority_column()
        ensure_reset_code_columns()
        seed_initial_accounts()
    debug_mode = os.environ.get('FLASK_DEBUG', 'True') == 'True'
    port = int(os.environ.get('PORT', 5050))
    app.run(debug=debug_mode, port=port)