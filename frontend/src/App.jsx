import { useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/* Lightweight inline SVG icon set — uniform 2px stroke, no emoji.     */
/* ------------------------------------------------------------------ */
const Icon = ({ path, size = 16, style = {}, viewBox = "0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    {path}
  </svg>
);

const IconSettings = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>} />;
const IconKey = (p) => <Icon {...p} path={<><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3-3.5 3.5zm0 0L19 4" /></>} />;
const IconMail = (p) => <Icon {...p} path={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>} />;
const IconLock = (p) => <Icon {...p} path={<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>} />;
const IconArrowLeft = (p) => <Icon {...p} path={<><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>} />;
const IconArrowRight = (p) => <Icon {...p} path={<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>} />;
const IconLogout = (p) => <Icon {...p} path={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>} />;
const IconPlus = (p) => <Icon {...p} path={<><path d="M12 5v14" /><path d="M5 12h14" /></>} />;
const IconCamera = (p) => <Icon {...p} path={<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>} />;
const IconCalendar = (p) => <Icon {...p} path={<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>} />;
const IconTrash = (p) => <Icon {...p} path={<><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></>} />;
const IconEdit = (p) => <Icon {...p} path={<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>} />;
const IconClock = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>} />;
const IconCheck = (p) => <Icon {...p} path={<><path d="M20 6 9 17l-5-5" /></>} />;
const IconMore = (p) => <Icon {...p} path={<><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></>} />;
const IconUsers = (p) => <Icon {...p} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>} />;
const IconZap = (p) => <Icon {...p} path={<><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></>} />;
const IconLayers = (p) => <Icon {...p} path={<><path d="m12 2 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>} />;
const IconMessage = (p) => <Icon {...p} path={<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></>} />;
const IconSend = (p) => <Icon {...p} path={<><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></>} />;
const IconBriefcase = (p) => <Icon {...p} path={<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>} />;
const IconTarget = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>} />;
const IconChevronDown = (p) => <Icon {...p} path={<path d="m6 9 6 6 6-6" />} />;
const IconX = (p) => <Icon {...p} path={<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>} />;
const IconSun = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>} />;
const IconMoon = (p) => <Icon {...p} path={<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />} />;
const IconAlertTriangle = (p) => <Icon {...p} path={<><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>} />;

/* ------------------------------------------------------------------ */
/* Skeleton loading placeholders — shimmer effect via CSS keyframes   */
/* defined in the global <style> block below.                        */
/* ------------------------------------------------------------------ */
const SkeletonBlock = ({ width = '100%', height = '14px', radius = '8px', style = {} }) => (
  <div className="yalla-skeleton" style={{ width, height, borderRadius: radius, ...style }} />
);
const SkeletonCircle = ({ size = '38px', style = {} }) => (
  <div className="yalla-skeleton" style={{ width: size, height: size, borderRadius: '50%', ...style }} />
);
const SkeletonTaskCard = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)', backgroundColor: 'rgba(255,255,255,0.7)', marginBottom: '14px' }}>
    <SkeletonCircle size="36px" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <SkeletonBlock width="45%" height="13px" />
      <SkeletonBlock width="30%" height="10px" />
    </div>
    <SkeletonBlock width="70px" height="22px" radius="999px" />
    <SkeletonBlock width="70px" height="22px" radius="999px" />
  </div>
);
const SkeletonTaskList = ({ rows = 3 }) => (
  <div>{Array.from({ length: rows }).map((_, i) => <SkeletonTaskCard key={i} />)}</div>
);
const SkeletonAnalytics = () => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '24px 26px', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)', backgroundColor: 'rgba(255,255,255,0.78)' }}>
          <SkeletonCircle size="48px" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonBlock width="60%" height="10px" />
            <SkeletonBlock width="40%" height="18px" />
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '28px' }}>
      <div style={{ padding: '32px', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <SkeletonBlock width="180px" height="18px" style={{ marginBottom: '24px' }} />
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <SkeletonCircle size="150px" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} height="12px" />)}
          </div>
        </div>
      </div>
      <div style={{ padding: '32px', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.06)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <SkeletonBlock width="260px" height="18px" style={{ marginBottom: '24px' }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <SkeletonCircle size="34px" />
            <SkeletonBlock height="10px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Confirm-before-delete modal — replaces window.confirm() everywhere */
/* ------------------------------------------------------------------ */
function useConfirmDialog() {
  const [state, setState] = useState(null);

  const confirm = (opts = {}) => new Promise((resolve) => {
    setState({
      title: opts.title || "Confirmer l'action",
      message: opts.message || 'Êtes-vous sûr de vouloir continuer ?',
      confirmLabel: opts.confirmLabel || 'Confirmer',
      cancelLabel: opts.cancelLabel || 'Annuler',
      resolve,
    });
  });

  const handleClose = (result) => {
    if (state?.resolve) state.resolve(result);
    setState(null);
  };

  const ConfirmDialog = () => {
    if (!state) return null;
    return (
      <div style={styles.modalOverlay} onClick={() => handleClose(false)}>
        <div style={styles.confirmModalCard} onClick={(e) => e.stopPropagation()} role="alertdialog" aria-modal="true">
          <div style={styles.confirmIconWrap}><IconAlertTriangle size={22} /></div>
          <h3 style={styles.confirmTitle}>{state.title}</h3>
          <p style={styles.confirmMessage}>{state.message}</p>
          <div style={styles.confirmActions}>
            <button style={styles.cancelButton} className="yalla-ghost-btn" onClick={() => handleClose(false)} autoFocus>{state.cancelLabel}</button>
            <button style={styles.confirmDangerButton} className="yalla-primary-btn" onClick={() => handleClose(true)}>{state.confirmLabel}</button>
          </div>
        </div>
      </div>
    );
  };

  return { confirm, ConfirmDialog };
}

/* ------------------------------------------------------------------ */
/* Centralized API base — set VITE_API_URL in your .env for prod.     */
/* ------------------------------------------------------------------ */
const API_BASE = import.meta.env?.VITE_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Access credentials form states
  const [uniqueCode, setUniqueCode] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Core Data Lists
  const [tasks, setTasks] = useState([]);
  const [teamList, setTeamList] = useState([]);

  // Loading flags for skeleton placeholders
  const [loadingTasks, setLoadingTasks] = useState(false);

  // --- Daily schedule view (second employee view) — reuses `tasks`,   ---
  // --- the same list shown in "Mes Shootings", split into a single    ---
  // --- morning/afternoon timeline instead of a separate data source.  ---
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const [employeeSubView, setEmployeeSubView] = useState('list'); // 'list' | 'schedule'
  const [scheduleDate, setScheduleDate] = useState(todayISO());

  const [loadingLedgers, setLoadingLedgers] = useState(false);

  // Dark mode
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('yalla-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch { /* ignore */ }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-yalla-theme', theme);
    try { localStorage.setItem('yalla-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  // Confirm-before-delete dialog
  const { confirm, ConfirmDialog } = useConfirmDialog();

  // Admin form management states
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeCode, setNewEmployeeCode] = useState('');
  const [newEmployeeSubRole, setNewEmployeeSubRole] = useState('prod');
  const [editingUserId, setEditingUserId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Employee side self-creation form states
  const [newEmployeeTaskTitle, setNewEmployeeTaskTitle] = useState('');
  const [newEmployeeTaskDesc, setNewEmployeeTaskDesc] = useState('');
  const [newEmployeeTaskDate, setNewEmployeeTaskDate] = useState('');
  const [newEmployeeTaskPriority, setNewEmployeeTaskPriority] = useState('Normale');
  const [showCreateShootingModal, setShowCreateShootingModal] = useState(false);

  // Priority for the admin task deployment form
  const [newTaskPriority, setNewTaskPriority] = useState('Normale');

  // Analytics dashboard state
  const [adminStats, setAdminStats] = useState(null);

  // Search & filter state for the real-time tracking board
  const [trackingSearchQuery, setTrackingSearchQuery] = useState('');
  const [trackingPriorityFilter, setTrackingPriorityFilter] = useState('all');

  // Comment UI handlers
  const [typedComments, setTypedComments] = useState({});
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [activeMenuCommentId, setActiveMenuCommentId] = useState(null);

  // Admin ledger task context menu (three-dots)
  const [activeTaskMenuId, setActiveTaskMenuId] = useState(null);

  useEffect(() => {
    if (currentView === 'admin_dashboard' || currentView === 'admin_tracking') {
      fetchAdminDashboardLedgers();
    }
    if (currentView === 'admin_analytics') {
      fetchAdminDashboardLedgers();
      fetchAdminStats();
    }
  }, [currentView]);

  useEffect(() => {
    const closeMenu = () => {
      setActiveMenuCommentId(null);
      setActiveTaskMenuId(null);
    };
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    if (!uniqueCode) return;
    try {
      const response = await fetch(`${API_BASE}/api/verify/${uniqueCode}`);
      const data = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setCurrentUser(data);
        fetchEmployeeTasks(data.user_id);
        setCurrentView('employee_dashboard');
      } else { setErrorMessage(data.message); }
    } catch (err) { setErrorMessage("Erreur de connexion."); }
  };

  const fetchEmployeeTasks = async (userId) => {
    setLoadingTasks(true);
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(Array.isArray(data) ? data : []);
      }
    } catch (err) { console.error(err); }
    finally { setLoadingTasks(false); }
  };

  const handleEmployeeSelfCreateTask = async (e) => {
    e.preventDefault();
    if (!newEmployeeTaskTitle || !newEmployeeTaskDate || !currentUser) return;
    try {
      const res = await fetch(`${API_BASE}/api/tasks/employee-create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newEmployeeTaskTitle,
          description: newEmployeeTaskDesc,
          date: newEmployeeTaskDate,
          priority: newEmployeeTaskPriority,
          user_id: currentUser.user_id
        })
      });
      if (res.ok) {
        setNewEmployeeTaskTitle('');
        setNewEmployeeTaskDesc('');
        setNewEmployeeTaskDate('');
        setNewEmployeeTaskPriority('Normale');
        setShowCreateShootingModal(false);
        fetchEmployeeTasks(currentUser.user_id);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteEmployeeOwnedTask = async (taskId) => {
    const ok = await confirm({
      title: "Supprimer ce shooting ?",
      message: "Cette action est définitive et ne peut pas être annulée.",
      confirmLabel: "Supprimer",
    });
    if (!ok) return;
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, { method: 'DELETE' });
      if (res.ok && currentUser) {
        fetchEmployeeTasks(currentUser.user_id);
      }
    } catch (err) { console.error(err); }
  };

  const calculateTotalDuration = (start, finish) => {
    if (!start || !finish) return null;
    const [startH, startM] = start.split(':').map(Number);
    const [finishH, finishM] = finish.split(':').map(Number);

    let totalMinutes = (finishH * 60 + finishM) - (startH * 60 + startM);
    if (totalMinutes < 0) totalMinutes += 24 * 60;

    const elapsedHours = Math.floor(totalMinutes / 60);
    const elapsedMinutes = totalMinutes % 60;

    if (elapsedHours === 0) return `${elapsedMinutes} min`;
    return `${elapsedHours}h ${elapsedMinutes > 0 ? elapsedMinutes + 'm' : ''}`;
  };

  const handleUpdateTaskMetrics = async (taskId, updatedPayload) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}/metrics`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });
      if (res.ok) {
        if (currentView === 'admin_dashboard' || currentView === 'admin_tracking') fetchAdminDashboardLedgers();
        else if (currentUser) fetchEmployeeTasks(currentUser.user_id);
      }
    } catch (err) { console.error(err); }
  };

  const handleUpdateTaskComment = async (taskId) => {
    const textPayload = typedComments[taskId] || '';
    if (!textPayload.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: textPayload })
      });
      if (res.ok && currentUser) {
        setTypedComments(prev => ({ ...prev, [taskId]: '' }));
        fetchEmployeeTasks(currentUser.user_id);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteComment = async (commentId) => {
    const ok = await confirm({
      title: "Supprimer ce commentaire ?",
      message: "Le commentaire sera retiré définitivement du fil de discussion.",
      confirmLabel: "Supprimer",
    });
    if (!ok) return;
    try {
      const res = await fetch(`${API_BASE}/api/comments/${commentId}`, { method: 'DELETE' });
      if (res.ok) {
        if (currentView === 'admin_dashboard' || currentView === 'admin_tracking') fetchAdminDashboardLedgers();
        else if (currentUser) fetchEmployeeTasks(currentUser.user_id);
      }
    } catch (err) { console.error(err); }
  };

  const handleEditComment = async (commentId, currentText) => {
    const updatedText = window.prompt("Modifier votre commentaire :", currentText);
    if (updatedText === null) return;
    if (!updatedText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: updatedText })
      });
      if (res.ok && currentUser) { fetchEmployeeTasks(currentUser.user_id); }
    } catch (err) { console.error(err); }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) return;
    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setCurrentUser(data);
        fetchAdminDashboardLedgers();
        setCurrentView('admin_dashboard');
      } else { setErrorMessage(data.message); }
    } catch (err) { setErrorMessage("Erreur de connexion."); }
  };

  const fetchAdminDashboardLedgers = async () => {
    setLoadingLedgers(true);
    try {
      const uRes = await fetch(`${API_BASE}/api/admin/users`);
      if (uRes.ok) {
        const uData = await uRes.json();
        setTeamList(Array.isArray(uData) ? uData : []);
      }
      const tRes = await fetch(`${API_BASE}/api/admin/tasks`);
      if (tRes.ok) {
        const tData = await tRes.json();
        setTasks(Array.isArray(tData) ? tData : []);
      }
    } catch (err) { console.error(err); }
    finally { setLoadingLedgers(false); }
  };

  const fetchAdminStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`);
      if (res.ok) {
        const data = await res.json();
        setAdminStats(data);
      }
    } catch (err) { console.error(err); }
  };

  const handleAutoGenerateCode = () => {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    setNewEmployeeCode(`YALLA-${randomHex}`);
  };

  const handleSaveEmployeeForm = async (e) => {
    e.preventDefault();
    if (!newEmployeeName || !newEmployeeCode) return;
    const isEditing = editingUserId !== null;
    const endpoint = isEditing ? `${API_BASE}/api/admin/users/${editingUserId}` : `${API_BASE}/api/admin/users`;
    try {
      const res = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEmployeeName, unique_code: newEmployeeCode, sub_role: newEmployeeSubRole })
      });
      if (res.ok) {
        setNewEmployeeName('');
        setNewEmployeeCode('');
        setNewEmployeeSubRole('prod');
        setEditingUserId(null);
        fetchAdminDashboardLedgers();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteEmployee = async (id) => {
    const ok = await confirm({
      title: "Supprimer ce collaborateur ?",
      message: "Toutes ses missions assignées resteront visibles mais ne pourront plus être réattribuées automatiquement.",
      confirmLabel: "Supprimer",
    });
    if (!ok) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) { fetchAdminDashboardLedgers(); }
    } catch (err) { console.error(err); }
  };

  const handleSaveTaskForm = async (e) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedEmployeeId) return;
    const isEditingTask = editingTaskId !== null;
    const endpoint = isEditingTask ? `${API_BASE}/api/admin/tasks/${editingTaskId}` : `${API_BASE}/api/admin/tasks`;
    try {
      const res = await fetch(endpoint, {
        method: isEditingTask ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDesc, date: newTaskDate, assigned_to_id: selectedEmployeeId, priority: newTaskPriority })
      });
      if (res.ok) {
        setNewTaskTitle('');
        setNewTaskDesc('');
        setNewTaskDate('');
        setSelectedEmployeeId('');
        setNewTaskPriority('Normale');
        setEditingTaskId(null);
        fetchAdminDashboardLedgers();
      }
    } catch (err) { console.error(err); }
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setNewTaskTitle(task.title);
    setNewTaskDesc(task.description || '');
    setNewTaskDate(task.date || '');
    setSelectedEmployeeId(task.assigned_to_id || '');
    setNewTaskPriority(task.priority || 'Normale');
    setActiveTaskMenuId(null);
  };

  const cancelTaskEditing = () => {
    setEditingTaskId(null);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDate('');
    setSelectedEmployeeId('');
    setNewTaskPriority('Normale');
  };

  const handleDeleteTask = async (id) => {
    const ok = await confirm({
      title: "Supprimer ce shooting ?",
      message: "Cette action est définitive et ne peut pas être annulée.",
      confirmLabel: "Supprimer",
    });
    if (!ok) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEditingTaskId(null);
        setActiveTaskMenuId(null);
        fetchAdminDashboardLedgers();
      }
    } catch (err) { console.error(err); }
  };

  const logoutAndFlushState = () => {
    setCurrentView('login');
    setUniqueCode('');
    setAdminEmail('');
    setAdminPassword('');
    setErrorMessage('');
    setCurrentUser(null);
    setEditingUserId(null);
    setEditingTaskId(null);
    setNewEmployeeName('');
    setNewEmployeeCode('');
    setNewEmployeeSubRole('prod');
    setTypedComments({});
  };

  // --- Status badge helper: desaturated, professional corporate palette ---
  const getOverdueBadgeStyle = () => theme === 'dark'
    ? { backgroundColor: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.35)' }
    : { backgroundColor: '#fee2e2', color: '#b91c1c' };

  const getStatusBadgeStyle = (status) => {
    if (theme === 'dark') {
      if (status === 'Terminé') return { backgroundColor: 'rgba(16,185,129,0.16)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)' };
      if (status === 'En cours') return { backgroundColor: 'rgba(245,158,11,0.16)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.3)' };
      return { backgroundColor: 'rgba(148,163,184,0.14)', color: '#cbd5e1', border: '1px solid rgba(148,163,184,0.25)' }; // En attente
    }
    if (status === 'Terminé') return { backgroundColor: '#d1fae5', color: '#065f46' };
    if (status === 'En cours') return { backgroundColor: '#fef3c7', color: '#92400e' };
    return { backgroundColor: '#f1f5f9', color: '#475569' }; // En attente
  };

  // --- Priority badge helper: color-coded urgency scale ---
  const getPriorityBadgeStyle = (priority) => {
    if (theme === 'dark') {
      if (priority === 'Urgente') return { backgroundColor: 'rgba(239,68,68,0.16)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' };
      if (priority === 'Haute') return { backgroundColor: 'rgba(249,115,22,0.16)', color: '#fdba74', border: '1px solid rgba(249,115,22,0.3)' };
      if (priority === 'Basse') return { backgroundColor: 'rgba(16,185,129,0.16)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)' };
      return { backgroundColor: 'rgba(99,102,241,0.16)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }; // Normale
    }
    if (priority === 'Urgente') return { backgroundColor: '#fee2e2', color: '#b91c1c' };
    if (priority === 'Haute') return { backgroundColor: '#ffedd5', color: '#c2410c' };
    if (priority === 'Basse') return { backgroundColor: '#ecfdf5', color: '#047857' };
    return { backgroundColor: '#eef2ff', color: '#4338ca' }; // Normale
  };

  const isTaskOverdue = (task) => {
    if (!task?.date || task.status === 'Terminé') return false;
    const todayStr = new Date().toISOString().slice(0, 10);
    return task.date < todayStr;
  };

  // Used to stop date pickers from allowing a date before today
  const todayISODate = new Date().toISOString().slice(0, 10);

  const totalProjects = tasks?.length || 0;
  const prodCount = teamList?.filter(u => u.sub_role === 'prod').length || 0;
  const cmCount = teamList?.filter(u => u.sub_role === 'cm').length || 0;

  return (
    <div style={{
      ...styles.backgroundWorkspace,
      alignItems: (currentView.includes('dashboard') || currentView === 'admin_tracking' || currentView === 'admin_analytics') ? 'flex-start' : 'center',
      padding: (currentView.includes('dashboard') || currentView === 'admin_tracking' || currentView === 'admin_analytics') ? '40px 20px' : '0px',
      paddingLeft: (currentView === 'admin_dashboard' || currentView === 'admin_tracking' || currentView === 'admin_analytics') ? '272px' : (currentView.includes('dashboard') ? '20px' : '0px')
    }} className="yalla-bg-flip">
      <style>{`
        html, body { margin:0; padding:0; width:100%; min-height:100%; font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
        * { box-sizing: border-box; }
        ::placeholder { color: #94a3b8; }

        /* --- Global interactive polish --- */
        button { font-family: inherit; }
        button:not(:disabled) { transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.15s ease, color 0.15s ease, filter 0.15s ease, opacity 0.15s ease; }
        button:active:not(:disabled) { transform: scale(0.97); }
        a, .yalla-row-card, .yalla-panel, .yalla-nav-btn { transition: all 0.18s ease; }

        input, select, textarea {
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #2b3e9a !important;
          box-shadow: 0 0 0 3px rgba(43, 62, 154, 0.14) !important;
        }

        /* Primary action buttons (Enregistrer, Planifier, Se connecter...) */
        .yalla-primary-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(15,23,42,0.18); filter: brightness(1.05); }

        /* Ghost / secondary buttons (Annuler) */
        .yalla-ghost-btn:hover:not(:disabled) { background-color: rgba(100,116,139,0.12); transform: translateY(-1px); }

        /* Small icon-only buttons (edit, delete, generate code, close modal, send comment) */
        .yalla-icon-btn:hover:not(:disabled) { transform: translateY(-1px) scale(1.06); filter: brightness(1.08); box-shadow: 0 4px 10px rgba(15,23,42,0.1); }

        /* Employee logout button */
        .yalla-logout-btn:hover:not(:disabled) { background-color: rgba(239, 68, 68, 0.16) !important; transform: translateY(-1px); }

        /* Sidebar */
        .yalla-sidebar .yalla-nav-btn:hover { background-color: rgba(43, 62, 154, 0.08); color: #2b3e9a; transform: translateX(3px); }
        .yalla-sidebar .yalla-logout-btn:hover { background-color: rgba(239, 68, 68, 0.1) !important; transform: translateX(3px); }
        .yalla-brand-badge { transition: transform 0.3s ease; }
        .yalla-sidebar:hover .yalla-brand-badge { transform: rotate(-8deg) scale(1.05); }

        /* Cards & panels lift on hover */
        .yalla-panel:hover { box-shadow: 0 6px 16px rgba(15,23,42,0.05), 0 20px 50px rgba(15,23,42,0.07) !important; }
        .yalla-row-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,23,42,0.08) !important; }
        .yalla-analytics-grid > div, .yalla-pill-grid > div { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .yalla-analytics-grid > div:hover, .yalla-pill-grid > div:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(15,23,42,0.09) !important; }
        .yalla-mini-list > div { transition: transform 0.15s ease, background-color 0.15s ease; }
        .yalla-mini-list > div:hover { background-color: rgba(255,255,255,0.95); transform: translateX(2px); }
        .yalla-ledger-area > div { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .yalla-ledger-area > div:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,23,42,0.08) !important; }
        .yalla-tracking-grid .yalla-panel:hover { box-shadow: none !important; }

        @media (max-width: 760px) {
          .yalla-schedule-grid { grid-template-columns: 1fr !important; }
        }

        /* Custom slim scrollbars */
        .yalla-mini-list, .yalla-ledger-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(43, 62, 154, 0.35) transparent;
        }
        .yalla-mini-list::-webkit-scrollbar { width: 6px; }
        .yalla-mini-list::-webkit-scrollbar-track { background: transparent; }
        .yalla-mini-list::-webkit-scrollbar-thumb { background-color: rgba(43, 62, 154, 0.25); border-radius: 10px; transition: background-color 0.15s ease; }
        .yalla-mini-list::-webkit-scrollbar-thumb:hover { background-color: rgba(43, 62, 154, 0.5); }

        /* Modal entrance */
        @keyframes yallaModalIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes yallaOverlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yallaPulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.55); } 70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

        /* Skeleton shimmer */
        @keyframes yallaShimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .yalla-skeleton {
          background: linear-gradient(90deg, #eef1f6 25%, #f8fafc 37%, #eef1f6 63%);
          background-size: 400% 100%;
          animation: yallaShimmer 1.4s ease infinite;
        }

        /* ------------------------------------------------------------ */
        /* Dark mode — flips the core surfaces via [data-yalla-theme]   */
        /* ------------------------------------------------------------ */
        [data-yalla-theme="dark"] body { background-color: #0b1220; }
        [data-yalla-theme="dark"] ::placeholder { color: #64748b; }
        [data-yalla-theme="dark"] .yalla-bg-flip { background: linear-gradient(180deg, #0b1220 0%, #0f172a 45%, #111827 100%) !important; }
        [data-yalla-theme="dark"] .yalla-surface-flip { background-color: rgba(30, 41, 59, 0.85) !important; border-color: rgba(255,255,255,0.08) !important; color: #e2e8f0; }
        [data-yalla-theme="dark"] .yalla-surface-flip-solid { background-color: #1e293b !important; border-color: rgba(255,255,255,0.08) !important; color: #e2e8f0; }
        [data-yalla-theme="dark"] .yalla-text-flip { color: #f1f5f9 !important; }
        [data-yalla-theme="dark"] .yalla-text-muted-flip { color: #94a3b8 !important; }
        [data-yalla-theme="dark"] .yalla-input-flip { background-color: rgba(15,23,42,0.6) !important; border-color: rgba(255,255,255,0.1) !important; color: #e2e8f0 !important; }
        [data-yalla-theme="dark"] .yalla-input-flip::placeholder { color: #64748b !important; }
        [data-yalla-theme="dark"] .yalla-row-flip { background-color: rgba(15,23,42,0.45) !important; border-color: rgba(255,255,255,0.06) !important; }
        [data-yalla-theme="dark"] .yalla-divider-flip { background-color: rgba(255,255,255,0.08) !important; }
        [data-yalla-theme="dark"] .yalla-skeleton { background: linear-gradient(90deg, #1e293b 25%, #2a374c 37%, #1e293b 63%); background-size: 400% 100%; }
        [data-yalla-theme="dark"] .yalla-icon-btn:hover:not(:disabled) { background-color: rgba(255,255,255,0.08); color: #f1f5f9 !important; filter: none; }

        /* On-brand keyboard focus ring, replacing the browser's default
           blue outline (which is what was showing up on the logout button). */
        button:focus-visible, a:focus-visible, [role="button"]:focus-visible, select:focus-visible {
          outline: 2.5px solid #C44421;
          outline-offset: 2px;
          text-decoration: none;
        }
        [data-yalla-theme="dark"] .yalla-sidebar-flip { background-color: rgba(15, 23, 42, 0.7) !important; border-color: rgba(255,255,255,0.06) !important; }
      `}</style>

      {/* ADMIN SIDEBAR NAVIGATION */}
      {(currentView === 'admin_dashboard' || currentView === 'admin_tracking' || currentView === 'admin_analytics') && (
        <div style={styles.adminSidebar} className="yalla-sidebar yalla-sidebar-flip">
          <div style={styles.sidebarBrandRow}>
            <div style={styles.sidebarBrandBadge} className="yalla-brand-badge"><IconLayers size={16} /></div>
            <span style={styles.sidebarBrandText} className="yalla-text-flip">YALLA</span>
          </div>

          <div style={styles.sidebarNavGroup}>
            <button
              style={{ ...styles.sidebarNavItem, ...(currentView === 'admin_dashboard' ? styles.sidebarNavItemActive : {}) }}
              className="yalla-nav-btn"
              onClick={() => setCurrentView('admin_dashboard')}
            >
              <IconBriefcase size={16} /> Direction Générale
            </button>
            <button
              style={{ ...styles.sidebarNavItem, ...(currentView === 'admin_tracking' ? styles.sidebarNavItemActive : {}) }}
              className="yalla-nav-btn"
              onClick={() => setCurrentView('admin_tracking')}
            >
              <IconLayers size={16} /> Suivi en Temps Réel des Shootings
            </button>
            <button
              style={{ ...styles.sidebarNavItem, ...(currentView === 'admin_analytics' ? styles.sidebarNavItemActive : {}) }}
              className="yalla-nav-btn"
              onClick={() => setCurrentView('admin_analytics')}
            >
              <IconTarget size={16} /> Analytics
            </button>
          </div>

          <button onClick={toggleTheme} style={styles.themeToggleBtn} className="yalla-icon-btn">
            {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </button>

          <button style={styles.sidebarLogoutItem} className="yalla-logout-btn" onClick={logoutAndFlushState}><IconLogout size={15} /> Déconnexion</button>
        </div>
      )}

      {/* 1. EMPLOYEE LOGIN */}
      {currentView === 'login' && (
        <>
          <div style={styles.topNavigation}>
            <button style={styles.themeToggleFloating} className="yalla-icon-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
            </button>
            <button style={styles.ghostAdminButton} onClick={() => { setCurrentView('admin_login'); setErrorMessage(''); }}>
              <IconSettings size={15} /> Administration
            </button>
          </div>
          <div style={styles.glassCard} className="yalla-surface-flip">
            <div style={styles.logoWrapper}><img src="/logo.png" alt="Yalla" style={styles.brandLogo} /></div>
            <h2 style={styles.cardHeaderTitle} className="yalla-text-flip">Planifier un Shooting</h2>
            <p style={styles.securityReminder} className="yalla-text-muted-flip">Votre code unique est strictement personnel. Il ne doit en aucun cas être partagé et relève entièrement de votre responsabilité.</p>
            <form onSubmit={handleEmployeeLogin} style={styles.authForm}>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}><IconKey size={16} /></span>
                <input type="text" placeholder="Saisissez votre code unique" style={styles.pillInput} className="yalla-input-flip" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} />
              </div>
              <button type="submit" style={styles.primaryPillButton} className="yalla-primary-btn">Vérifier le code</button>
            </form>
            {errorMessage && <div style={styles.errorBanner}>{errorMessage}</div>}
          </div>
        </>
      )}

      {/* 2. ADMIN LOGIN */}
      {currentView === 'admin_login' && (
        <div style={styles.glassCard} className="yalla-surface-flip">
          <div style={styles.backLinkWrapper} onClick={() => { setCurrentView('login'); setErrorMessage(''); }}>
            <IconArrowLeft size={16} /> Retour au formulaire
          </div>
          <div style={styles.lockBadgeContainer}><div style={styles.blueCircleLockBadge}><IconLock size={22} /></div></div>
          <h2 style={styles.adminCardTitle} className="yalla-text-flip">Administration</h2>
          <p style={styles.adminCardSubtitle} className="yalla-text-muted-flip">Connectez-vous pour accéder à l'interface</p>
          <form onSubmit={handleAdminLogin} style={styles.authForm}>
            <div style={styles.fieldBlockLayout}>
              <label style={styles.fieldInputLabel} className="yalla-text-flip">Email</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}><IconMail size={16} /></span>
                <input type="email" placeholder="votre.email@exemple.com" style={styles.pillInput} className="yalla-input-flip" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required />
              </div>
            </div>
            <div style={styles.fieldBlockLayout}>
              <label style={styles.fieldInputLabel} className="yalla-text-flip">Mot de passe</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}><IconLock size={16} /></span>
                <input type="password" placeholder="••••••••" style={styles.pillInput} className="yalla-input-flip" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" style={styles.primaryAdminConnectButton} className="yalla-primary-btn">Se connecter</button>
          </form>
          {errorMessage && <div style={styles.errorBanner}>{errorMessage}</div>}
        </div>
      )}

      {/* 3. EMPLOYEE WORKSPACE */}
      {currentView === 'employee_dashboard' && (
        <div style={styles.dashboardContainer}>
          <div style={styles.dashHeader}>
            <div>
              <h1 style={styles.mainHeading} className="yalla-text-flip">Bonjour, {currentUser?.name}</h1>
              <div style={{ marginTop: '8px' }}>
                <span style={{
                  fontSize: '0.85rem', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', display: 'inline-block',
                  ...(currentUser?.sub_role === 'cm'
                    ? { backgroundColor: '#fce7f3', color: '#be185d' }
                    : { backgroundColor: '#e0f2fe', color: '#0369a1' })
                }}>
                  {currentUser?.sub_role === 'cm' ? 'Community Manager' : 'Production'}
                </span>
              </div>
              <p style={styles.subHeading} className="yalla-text-muted-flip">Gérez vos horaires et créez vos propres missions</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={toggleTheme} style={styles.themeToggleBtn} className="yalla-icon-btn">
                {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
                {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              </button>
              <button style={styles.logoutBtn} className="yalla-logout-btn" onClick={logoutAndFlushState}><IconLogout size={15} /> Déconnexion</button>
            </div>
          </div>

          <div style={styles.pillStatsGrid} className="yalla-pill-grid">
            <div style={styles.pillStatCard} className="yalla-surface-flip">
              <span style={{ ...styles.pillStatDot, backgroundColor: '#64748b' }} />
              <span style={styles.pillStatValue} className="yalla-text-flip">{(tasks || []).length}</span>
              <span style={styles.pillStatLabel} className="yalla-text-muted-flip">Total</span>
            </div>
            <div style={styles.pillStatCard} className="yalla-surface-flip">
              <span style={{ ...styles.pillStatDot, backgroundColor: '#f59e0b' }} />
              <span style={styles.pillStatValue} className="yalla-text-flip">{(tasks || []).filter(t => t.status === 'En cours').length}</span>
              <span style={styles.pillStatLabel} className="yalla-text-muted-flip">En cours</span>
            </div>
            <div style={styles.pillStatCard} className="yalla-surface-flip">
              <span style={{ ...styles.pillStatDot, backgroundColor: '#10b981' }} />
              <span style={styles.pillStatValue} className="yalla-text-flip">{(tasks || []).filter(t => t.status === 'Terminé').length}</span>
              <span style={styles.pillStatLabel} className="yalla-text-muted-flip">Terminés</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
            <button
              type="button"
              onClick={() => setEmployeeSubView('list')}
              style={{
                ...styles.viewTabButton,
                ...(employeeSubView === 'list' ? styles.viewTabButtonActive : {})
              }}
              className={employeeSubView === 'list' ? 'yalla-primary-btn' : 'yalla-surface-flip yalla-text-muted-flip'}
            >
              <IconLayers size={15} /> Mes Shootings
            </button>
            <button
              type="button"
              onClick={() => setEmployeeSubView('schedule')}
              style={{
                ...styles.viewTabButton,
                ...(employeeSubView === 'schedule' ? styles.viewTabButtonActive : {})
              }}
              className={employeeSubView === 'schedule' ? 'yalla-primary-btn' : 'yalla-surface-flip yalla-text-muted-flip'}
            >
              <IconClock size={15} /> Planning du Jour
            </button>
          </div>

          {employeeSubView === 'list' && (<>
          <button
            type="button"
            onClick={() => setShowCreateShootingModal(true)}
            style={{ ...styles.premiumUserCard, marginBottom: '24px', backgroundColor: 'rgba(255, 255, 255, 0.9)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', border: 'none', textAlign: 'left', width: '100%' }}
            className="yalla-row-card yalla-surface-flip"
          >
            <span style={{ ...styles.userTaskTitleText, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }} className="yalla-text-flip">
              <IconPlus size={18} /> Créer un shooting personnel
            </span>
            <IconChevronDown size={18} style={{ color: '#64748b' }} />
          </button>

          {showCreateShootingModal && (
            <div
              style={{ ...styles.modalOverlay, animation: 'yallaOverlayIn 0.18s ease' }}
              onClick={() => setShowCreateShootingModal(false)}
            >
              <div style={{ ...styles.modalCard, animation: 'yallaModalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }} className="yalla-surface-flip-solid" onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h3 style={{ ...styles.userTaskTitleText, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }} className="yalla-text-flip">
                    <IconPlus size={18} /> Créer un shooting personnel
                  </h3>
                  <button type="button" onClick={() => setShowCreateShootingModal(false)} style={styles.modalCloseBtn} className="yalla-icon-btn">
                    <IconX size={18} />
                  </button>
                </div>
                <form onSubmit={handleEmployeeSelfCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="Titre du shooting" style={styles.premiumInput} className="yalla-input-flip" value={newEmployeeTaskTitle} onChange={e => setNewEmployeeTaskTitle(e.target.value)} required />
                    <input type="date" style={styles.premiumInput} className="yalla-input-flip" value={newEmployeeTaskDate} onChange={e => setNewEmployeeTaskDate(e.target.value)} min={todayISODate} required />
                  </div>
                  <textarea placeholder="Instructions ou notes complémentaires..." style={{ ...styles.premiumInput, height: '70px', resize: 'none' }} className="yalla-input-flip" value={newEmployeeTaskDesc} onChange={e => setNewEmployeeTaskDesc(e.target.value)} />
                  <select style={styles.premiumSelect} className="yalla-input-flip" value={newEmployeeTaskPriority} onChange={e => setNewEmployeeTaskPriority(e.target.value)}>
                    <option value="Basse">Priorité basse</option>
                    <option value="Normale">Priorité normale</option>
                    <option value="Haute">Priorité haute</option>
                    <option value="Urgente">Priorité urgente</option>
                  </select>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button type="button" onClick={() => setShowCreateShootingModal(false)} style={styles.cancelButton} className="yalla-ghost-btn">Annuler</button>
                    <button type="submit" style={{ ...styles.commentBarSubmitBtn, padding: '10px 18px', cursor: 'pointer' }} className="yalla-primary-btn">Ajouter à mon planning</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div style={styles.scrollArea}>
            {loadingTasks ? (
              <SkeletonTaskList rows={3} />
            ) : !tasks || tasks.length === 0 ? (
              <div style={styles.emptyAlert} className="yalla-surface-flip">Aucun shooting au planning pour le moment.</div>
            ) : (
              (tasks || []).map(t => {
                const totalDurationStr = calculateTotalDuration(t.started_at, t.finished_at);
                return (
                  <div key={t.id} style={styles.premiumUserCard} className="yalla-row-card yalla-surface-flip">
                    <div style={styles.userCardHeader}>
                      <div style={styles.userCardLeft}>
                        <span style={styles.shootingIconPrefix}><IconCamera size={20} /></span>
                        <h3 style={styles.userTaskTitleText} className="yalla-text-flip">{t.title}</h3>
                        <span style={{ ...styles.statusBadge, ...getPriorityBadgeStyle(t.priority), fontSize: '0.7rem', padding: '3px 9px' }}>{t.priority || 'Normale'}</span>
                        {isTaskOverdue(t) && (
                          <span style={{ ...styles.statusBadge, ...getOverdueBadgeStyle(), fontSize: '0.7rem', padding: '3px 9px' }}>En retard</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {t.date && <span style={styles.userDateTextBadge}><IconCalendar size={13} style={{ marginRight: '5px', verticalAlign: 'middle' }} />{t.date}</span>}

                        <select
                          value={t.status}
                          onChange={(e) => handleUpdateTaskMetrics(t.id, { status: e.target.value })}
                          style={styles.interactiveStatusSelect}
                        >
                          <option value="En attente">En attente</option>
                          <option value="En cours">En cours</option>
                          <option value="Terminé">Terminé</option>
                        </select>

                        {t.is_self_created && (
                          <button
                            title="Supprimer mon shooting"
                            onClick={() => handleDeleteEmployeeOwnedTask(t.id)}
                            style={{ ...styles.rowIconButton, padding: '6px', backgroundColor: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px', color: '#dc2626', display: 'flex' }} className="yalla-icon-btn"
                          >
                            <IconTrash size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={styles.cardDividerLine} className="yalla-divider-flip" />
                    <p style={styles.userTaskDescriptionParagraph} className="yalla-text-flip">{t.description ? t.description : "Aucune instruction spécifique rédigée."}</p>

                    <div style={{ display: 'flex', gap: '16px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', marginTop: '14px', alignItems: 'center', flexWrap: 'wrap', border: '1px solid #edf2f7' }} className="yalla-row-flip">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: '600', color: '#475569' }} className="yalla-text-muted-flip">Début :</span>
                        <input
                          type="time"
                          value={t.started_at || ''}
                          onChange={(e) => handleUpdateTaskMetrics(t.id, { started_at: e.target.value })}
                          style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '6px', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}>
                        <span style={{ fontWeight: '600', color: '#475569' }} className="yalla-text-muted-flip">Fin :</span>
                        <input
                          type="time"
                          value={t.finished_at || ''}
                          onChange={(e) => handleUpdateTaskMetrics(t.id, { finished_at: e.target.value })}
                          style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '6px', outline: 'none' }}
                        />
                      </div>

                      {totalDurationStr && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.88rem', fontWeight: '700', color: '#2b3e9a', backgroundColor: '#e0e7ff', padding: '4px 10px', borderRadius: '8px', marginLeft: 'auto' }}>
                          <IconClock size={13} /> Durée totale : {totalDurationStr}
                        </div>
                      )}
                    </div>

                    {t?.comments && t?.comments.length > 0 && (
                      <div style={styles.commentsHistoryBlock}>
                        <h4 style={styles.historyTitle} className="yalla-text-muted-flip">Suivi d'avancement :</h4>
                        {(t.comments || []).map(c => (
                          <div
                            key={c.id}
                            style={styles.commentRowItem}
                            onMouseEnter={() => setHoveredCommentId(c.id)}
                            onMouseLeave={() => setHoveredCommentId(null)}
                          >
                            <span style={styles.commentTimeBadge}>[{c.time}]</span>
                            <p style={styles.commentBubbleText} className="yalla-text-flip">{c.text}</p>

                            {hoveredCommentId === c.id && (
                              <div style={styles.menuAnchorWrapper}>
                                <button
                                  style={styles.threeDotsButton} className="yalla-icon-btn"
                                  onClick={(e) => { e.stopPropagation(); setActiveMenuCommentId(activeMenuCommentId === c.id ? null : c.id); }}
                                >
                                  <IconMore size={15} />
                                </button>

                                {activeMenuCommentId === c.id && (
                                  <div style={styles.dropdownPopupBox} className="yalla-surface-flip-solid">
                                    <button style={styles.dropdownActionItem} onClick={() => handleEditComment(c.id, c.text)}><IconEdit size={13} /> Modifier</button>
                                    <button style={{ ...styles.dropdownActionItem, color: '#dc2626' }} onClick={() => handleDeleteComment(c.id)}><IconTrash size={13} /> Supprimer</button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={styles.cardDividerLine} className="yalla-divider-flip" />

                    <div style={styles.commentBarLayout}>
                      <input
                        type="text"
                        placeholder="Ajouter une note d'avancement..."
                        style={styles.commentBarInput}
                        className="yalla-input-flip"
                        value={typedComments[t.id] || ''}
                        onChange={(e) => setTypedComments({ ...typedComments, [t.id]: e.target.value })}
                      />
                      <button onClick={() => handleUpdateTaskComment(t.id)} style={styles.commentBarSubmitBtn} className="yalla-icon-btn"><IconSend size={14} /></button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          </>)}

          {employeeSubView === 'schedule' && (
            <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', width: 'min(1180px, 94vw)' }}>
            <div style={{ ...styles.premiumUserCard, padding: 0, overflow: 'hidden' }} className="yalla-surface-flip">
              <div style={styles.scheduleHeaderStrip}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'capitalize' }}>
                      <IconClock size={20} />
                      {new Date(scheduleDate + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h2>
                    <p style={{ margin: '6px 0 0 30px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
                      Vos shootings positionnés selon leur heure de début et de fin
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => { const d = new Date(scheduleDate); d.setDate(d.getDate() - 1); setScheduleDate(d.toISOString().slice(0, 10)); }}
                      style={styles.scheduleNavArrowDark} className="yalla-icon-btn"
                    ><IconArrowLeft size={14} /></button>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      style={styles.scheduleDateInputDark}
                    />
                    <button
                      type="button"
                      onClick={() => { const d = new Date(scheduleDate); d.setDate(d.getDate() + 1); setScheduleDate(d.toISOString().slice(0, 10)); }}
                      style={styles.scheduleNavArrowDark} className="yalla-icon-btn"
                    ><IconArrowRight size={14} /></button>
                    {scheduleDate !== todayISO() && (
                      <button type="button" onClick={() => setScheduleDate(todayISO())} style={styles.scheduleTodayBtnDark}>Aujourd'hui</button>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ padding: '28px 32px 32px' }}>
                {(() => {
                  /* ---- Layout constants: 08:30 → 17:30 visual range, fluid % scaled ---- */
                  const RANGE_START = 8 * 60 + 30;   // 510
                  const RANGE_END = 17 * 60 + 30;    // 1050
                  const RANGE_MIN = RANGE_END - RANGE_START; // 540
                  const ROW_HEIGHT = 68;
                  const WHOLE_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
                  const pctNum = (minutes) => ((minutes - RANGE_START) / RANGE_MIN) * 100;
                  const pct = (minutes) => `${pctNum(minutes)}%`;

                  const toMinutes = (hhmm) => {
                    if (!hhmm || typeof hhmm !== 'string' || !hhmm.includes(':')) return null;
                    const [h, m] = hhmm.split(':').map(Number);
                    if (Number.isNaN(h) || Number.isNaN(m)) return null;
                    return h * 60 + m;
                  };

                  const dayTasks = (tasks || []).filter(t => t.date === scheduleDate);
                  const scheduled = dayTasks
                    .map(t => {
                      const start = toMinutes(t.started_at);
                      if (start === null) return null;
                      let end = toMinutes(t.finished_at);
                      if (end === null || end <= start) end = start + 45; // default block length
                      return { ...t, _start: start, _end: end };
                    })
                    .filter(Boolean)
                    .sort((a, b) => a._start - b._start || a._end - b._end);
                  const unscheduled = dayTasks.filter(t => !toMinutes(t.started_at));

                  /* ---- Greedy row assignment so overlapping tasks stack into new rows ---- */
                  const rowEnds = []; // last end-time occupying each row
                  const positioned = scheduled.map(t => {
                    let row = rowEnds.findIndex(end => end <= t._start);
                    if (row === -1) { row = rowEnds.length; rowEnds.push(t._end); }
                    else { rowEnds[row] = t._end; }
                    return { ...t, _row: row };
                  });
                  const rowCount = Math.max(rowEnds.length, 1);
                  const TRACK_HEIGHT = rowCount * ROW_HEIGHT;

                  const clampX = (min) => Math.min(Math.max(min, RANGE_START), RANGE_END);

                  const now = new Date();
                  const isToday = scheduleDate === todayISO();
                  const nowMinutes = now.getHours() * 60 + now.getMinutes();
                  const showNowLine = isToday && nowMinutes >= RANGE_START && nowMinutes <= RANGE_END;

                  const totalPlannedMin = scheduled.reduce((sum, t) => sum + (t._end - t._start), 0);
                  const totalHours = Math.floor(totalPlannedMin / 60);
                  const totalMins = totalPlannedMin % 60;
                  const doneCount = scheduled.filter(t => t.status === 'Terminé').length;

                  return (
                    <>
                      {/* Summary strip + legend */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700 }} className="yalla-text-flip">
                            {scheduled.length} shooting{scheduled.length !== 1 ? 's' : ''} programmé{scheduled.length !== 1 ? 's' : ''}
                          </span>
                          {totalPlannedMin > 0 && (
                            <span style={{ fontSize: '0.82rem' }} className="yalla-text-muted-flip">
                              {totalHours > 0 ? `${totalHours}h` : ''}{totalMins > 0 ? `${totalMins}m` : (totalHours === 0 ? '0m' : '')} planifiées
                            </span>
                          )}
                          {scheduled.length > 0 && (
                            <span style={{ fontSize: '0.82rem' }} className="yalla-text-muted-flip">{doneCount}/{scheduled.length} terminés</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {['Basse', 'Normale', 'Haute', 'Urgente'].map(p => {
                            const s = getPriorityBadgeStyle(p);
                            return (
                              <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 700 }} className="yalla-text-muted-flip">
                                <span style={{ width: '8px', height: '8px', borderRadius: '3px', backgroundColor: s.color, display: 'inline-block' }} />{p}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hour ruler */}
                      <div style={{ position: 'relative', height: '20px', marginBottom: '2px' }}>
                        <span style={{ position: 'absolute', left: '0%', fontSize: '0.7rem', fontWeight: 800 }} className="yalla-text-flip">08:30</span>
                        {WHOLE_HOURS.slice(0, -1).map(h => (
                          <span
                            key={h}
                            style={{ position: 'absolute', left: pct(h * 60), transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700 }}
                            className="yalla-text-muted-flip"
                          >{String(h).padStart(2, '0')}:00</span>
                        ))}
                        <span style={{ position: 'absolute', right: '0%', fontSize: '0.7rem', fontWeight: 800 }} className="yalla-text-flip">17:30</span>
                      </div>

                      {/* Timeline track */}
                      <div
                        style={{
                          position: 'relative', width: '100%', height: `${TRACK_HEIGHT}px`,
                          borderRadius: '14px', border: '1px solid rgba(15,23,42,0.1)', overflow: 'hidden',
                          boxShadow: 'inset 0 1px 3px rgba(15,23,42,0.04)'
                        }}
                        className="yalla-divider-flip yalla-row-flip"
                      >
                        {/* Zebra row shading */}
                        {Array.from({ length: rowCount }).map((_, i) => (
                          i % 2 === 1 && (
                            <div key={i} style={{
                              position: 'absolute', left: 0, right: 0, top: `${i * ROW_HEIGHT}px`, height: `${ROW_HEIGHT}px`,
                              backgroundColor: 'rgba(148,163,184,0.05)', pointerEvents: 'none'
                            }} />
                          )
                        ))}

                        {/* Hour gridlines */}
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '0%', borderLeft: '1px solid rgba(148,163,184,0.35)' }} />
                        {WHOLE_HOURS.map(h => (
                          <div key={h} style={{
                            position: 'absolute', top: 0, bottom: 0, left: pct(h * 60),
                            borderLeft: '1px solid rgba(148,163,184,0.28)'
                          }} />
                        ))}

                        {/* Lunch break shading 13:00–14:00 */}
                        <div style={{
                          position: 'absolute', top: 0, bottom: 0,
                          left: pct(13 * 60), width: `${pctNum(14 * 60) - pctNum(13 * 60)}%`,
                          background: 'repeating-linear-gradient(135deg, rgba(148,163,184,0.12) 0, rgba(148,163,184,0.12) 6px, transparent 6px, transparent 12px)',
                          pointerEvents: 'none', zIndex: 1
                        }}>
                          <span style={{ position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.04em', whiteSpace: 'nowrap' }} className="yalla-text-muted-flip">PAUSE</span>
                        </div>

                        {/* Current time indicator */}
                        {showNowLine && (
                          <div style={{
                            position: 'absolute', top: 0, bottom: 0, left: pct(nowMinutes),
                            borderLeft: '2px solid #ef4444', zIndex: 6
                          }}>
                            <span style={styles.scheduleNowDot} />
                            <span style={{
                              position: 'absolute', top: '-21px', left: '6px', fontSize: '0.62rem', fontWeight: 800,
                              color: '#ef4444', whiteSpace: 'nowrap'
                            }}>{now.toTimeString().slice(0, 5)}</span>
                          </div>
                        )}

                        {/* Task blocks */}
                        {positioned.length === 0 ? (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: 'rgba(148,163,184,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <IconCalendar size={20} style={{ opacity: 0.5 }} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }} className="yalla-text-muted-flip">Aucun shooting programmé ce jour-là</span>
                          </div>
                        ) : positioned.map(t => {
                          const startClamped = clampX(t._start);
                          const endClamped = clampX(t._end);
                          const durationMin = endClamped - startClamped;
                          const priorityStyle = getPriorityBadgeStyle(t.priority);
                          const isDone = t.status === 'Terminé';
                          const isInProgress = t.status === 'En cours';
                          return (
                            <div
                              key={t.id}
                              title={`${t.title} · ${t.started_at}${t.finished_at ? ' – ' + t.finished_at : ''}`}
                              style={{
                                position: 'absolute',
                                left: pct(startClamped),
                                width: `calc(${pct(endClamped)} - ${pct(startClamped)})`,
                                minWidth: '58px',
                                top: `${t._row * ROW_HEIGHT + 7}px`, height: `${ROW_HEIGHT - 14}px`,
                                background: `linear-gradient(160deg, ${priorityStyle.backgroundColor} 0%, ${priorityStyle.backgroundColor}cc 100%)`,
                                borderLeft: `4px solid ${priorityStyle.color}`,
                                borderRadius: '10px',
                                padding: '7px 11px',
                                overflow: 'hidden',
                                cursor: 'default',
                                opacity: isDone ? 0.68 : 1,
                                boxShadow: '0 2px 6px rgba(15,23,42,0.1)',
                                display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center',
                                zIndex: 2
                              }}
                              className="yalla-row-card"
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', fontWeight: 800, color: priorityStyle.color, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {isDone ? <IconCheck size={11} /> : isInProgress ? <IconZap size={11} /> : <IconCamera size={11} />}
                                {t.title}
                              </span>
                              {durationMin >= 35 && (
                                <span style={{ fontSize: '0.66rem', fontWeight: 700, color: priorityStyle.color, opacity: 0.85, whiteSpace: 'nowrap' }}>
                                  {t.started_at}{t.finished_at ? ` – ${t.finished_at}` : ''}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}

                {(() => {
                  const dayTasks = (tasks || []).filter(t => t.date === scheduleDate);
                  const unscheduled = dayTasks.filter(t => !t.started_at || !t.started_at.includes(':'));
                  if (unscheduled.length === 0) return null;
                  return (
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(15,23,42,0.08)' }} className="yalla-divider-flip">
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }} className="yalla-text-muted-flip">
                        <IconAlertTriangle size={13} /> Sans heure de début définie
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {unscheduled.map(t => (
                          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', flexWrap: 'wrap' }} className="yalla-row-card yalla-row-flip">
                            <span style={{ flex: 1, fontSize: '0.88rem', minWidth: '120px' }} className="yalla-text-flip">{t.title}</span>
                            <span style={{ ...styles.statusBadge, ...getPriorityBadgeStyle(t.priority), fontSize: '0.7rem', padding: '3px 9px' }}>{t.priority || 'Normale'}</span>
                            <span style={{ ...styles.statusBadge, ...getStatusBadgeStyle(t.status), fontSize: '0.7rem', padding: '3px 9px' }}>{t.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ADMIN DASHBOARD */}
      {currentView === 'admin_dashboard' && (
        <div style={styles.adminLayout}>
          <div style={styles.dashHeader}>
            <div>
              <h1 style={styles.mainHeading} className="yalla-text-flip">Direction Générale</h1>
              <p style={styles.subHeading} className="yalla-text-muted-flip">Génération des accès sécurisés et assignation des shootings de production</p>
            </div>
          </div>

          {/* --- Analytics summary layer --- */}
          {loadingLedgers && !teamList.length && !tasks.length ? (
            <SkeletonAnalytics />
          ) : (
            <>
              <div style={styles.analyticsGrid} className="yalla-analytics-grid">
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#eef2ff', color: '#4338ca' }}><IconBriefcase size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">Projets totaux</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{totalProjects}</p>
                  </div>
                </div>
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#e0f2fe', color: '#0369a1' }}><IconCamera size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">Équipe Production</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{prodCount}</p>
                  </div>
                </div>
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#fce7f3', color: '#be185d' }}><IconTarget size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">Community Managers</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{cmCount}</p>
                  </div>
                </div>
              </div>

              <div style={styles.adminGridSplit}>
                <div style={styles.premiumControlBlock} className="yalla-panel yalla-surface-flip">
                  <h2 style={styles.blockTitle} className="yalla-text-flip">{editingUserId ? "Modifier le profil" : "Équipe & Codes Privés"}</h2>
                  <form onSubmit={handleSaveEmployeeForm} style={styles.stackedForm}>
                    <input type="text" placeholder="Nom complet" style={styles.premiumInput} className="yalla-input-flip" value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)} required />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <select
                        style={styles.premiumSelect}
                        className="yalla-input-flip"
                        value={newEmployeeSubRole}
                        onChange={e => setNewEmployeeSubRole(e.target.value)}
                      >
                        <option value="prod">Production (Prod)</option>
                        <option value="cm">Community Manager (CM)</option>
                      </select>
                      <div style={styles.actionInputGroup}>
                        <input type="text" placeholder="Code d'accès" style={styles.premiumInput} className="yalla-input-flip" value={newEmployeeCode} onChange={e => setNewEmployeeCode(e.target.value)} required />
                        <button type="button" onClick={handleAutoGenerateCode} style={styles.generateButton} className="yalla-icon-btn"><IconZap size={14} /></button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" style={{ ...styles.premiumAddButton, flex: 2, backgroundColor: editingUserId ? '#d97706' : '#2b3e9a' }} className="yalla-primary-btn">
                        {editingUserId ? "Sauvegarder" : "Enregistrer"}
                      </button>
                      {editingUserId && <button type="button" onClick={() => { setEditingUserId(null); setNewEmployeeName(''); setNewEmployeeCode(''); setNewEmployeeSubRole('prod'); }} style={styles.cancelButton} className="yalla-ghost-btn">Annuler</button>}
                    </div>
                  </form>
                  <div style={styles.miniListArea} className="yalla-mini-list">
                    {(teamList || []).map(emp => {
                      const isCM = emp.sub_role === 'cm';
                      const accent = isCM ? '#be185d' : '#0369a1';
                      const bg = isCM ? '#fce7f3' : '#e0f2fe';
                      const initials = (emp.name || '?').trim().slice(0, 2).toUpperCase();
                      return (
                        <div
                          key={emp.id}
                          style={{ ...styles.miniListItem, ...(editingUserId === emp.id ? styles.miniListItemActive : {}) }}
                          className="yalla-row-card yalla-row-flip"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                            <div style={{ ...styles.assigneeAvatar, backgroundColor: bg, color: accent, width: '34px', height: '34px', fontSize: '0.72rem' }}>{initials}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                              <span style={{ fontSize: '0.96rem', color: '#1e293b', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="yalla-text-flip">{emp.name}</span>
                              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: accent, letterSpacing: '0.03em' }}>
                                {isCM ? 'COMMUNITY MANAGER' : 'PRODUCTION'}
                              </span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                            <code style={styles.premiumCodeBadge}>{emp.unique_code}</code>
                            <button onClick={() => { setEditingUserId(emp.id); setNewEmployeeName(emp.name); setNewEmployeeCode(emp.unique_code); setNewEmployeeSubRole(emp.sub_role || 'prod'); }} style={{ ...styles.rowIconButton, color: '#64748b', display: 'flex' }} className="yalla-icon-btn"><IconEdit size={14} /></button>
                            <button onClick={() => handleDeleteEmployee(emp.id)} style={{ ...styles.rowIconButton, color: '#dc2626', display: 'flex' }} className="yalla-icon-btn"><IconTrash size={14} /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={styles.premiumControlBlock} className="yalla-panel yalla-surface-flip">
                  <h2 style={styles.blockTitle} className="yalla-text-flip">{editingTaskId ? "Modifier le Shooting" : "Déployer un Nouveau Shooting"}</h2>
                  <form onSubmit={handleSaveTaskForm} style={styles.blockForm}>
                    <input type="text" placeholder="Titre du shooting" style={styles.premiumInput} className="yalla-input-flip" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required />
                    <textarea placeholder="Instructions de prises de vue..." style={{ ...styles.premiumInput, height: '70px', resize: 'none' }} className="yalla-input-flip" value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} />
                    <input type="date" style={styles.premiumInput} className="yalla-input-flip" value={newTaskDate} onChange={e => setNewTaskDate(e.target.value)} min={todayISODate} required />
                    <select style={styles.premiumSelect} className="yalla-input-flip" value={selectedEmployeeId} onChange={e => setSelectedEmployeeId(e.target.value)} required>
                      <option value="">-- Choisir l'opérateur photo --</option>
                      {(teamList || []).map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                    </select>
                    <select style={styles.premiumSelect} className="yalla-input-flip" value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value)}>
                      <option value="Basse">Priorité basse</option>
                      <option value="Normale">Priorité normale</option>
                      <option value="Haute">Priorité haute</option>
                      <option value="Urgente">Priorité urgente</option>
                    </select>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" style={{ ...styles.premiumDeployButton, flex: 2, backgroundColor: editingTaskId ? '#d97706' : '#2b3e9a' }} className="yalla-primary-btn">
                        {editingTaskId ? "Sauvegarder les modifications" : "Planifier la mission"}
                      </button>
                      {editingTaskId && <button type="button" onClick={cancelTaskEditing} style={styles.cancelButton} className="yalla-ghost-btn">Annuler</button>}
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 5. ADMIN TRACKING (real-time follow-up, full page) */}
      {currentView === 'admin_tracking' && (
        <div style={styles.adminLayout}>
          <div style={styles.dashHeader}>
            <div>
              <h1 style={{ ...styles.mainHeading, display: 'flex', alignItems: 'center', gap: '10px' }} className="yalla-text-flip"><IconLayers size={26} /> Suivi en Temps Réel des Shootings</h1>
              <p style={styles.subHeading} className="yalla-text-muted-flip">Vue consolidée de l'avancement de chaque collaborateur</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={{ ...styles.inputContainer, flex: '1 1 260px', margin: 0 }}>
              <span style={styles.inputIcon}><IconLayers size={15} /></span>
              <input
                type="text"
                placeholder="Rechercher un shooting ou un collaborateur..."
                style={{ ...styles.pillInput, backgroundColor: '#fff' }}
                className="yalla-input-flip"
                value={trackingSearchQuery}
                onChange={e => setTrackingSearchQuery(e.target.value)}
              />
            </div>
            <select
              style={{ ...styles.premiumSelect, width: 'auto', minWidth: '190px' }}
              className="yalla-input-flip"
              value={trackingPriorityFilter}
              onChange={e => setTrackingPriorityFilter(e.target.value)}
            >
              <option value="all">Toutes priorités</option>
              <option value="Urgente">Urgente</option>
              <option value="Haute">Haute</option>
              <option value="Normale">Normale</option>
              <option value="Basse">Basse</option>
            </select>
          </div>

          <div style={{ ...styles.premiumControlBlock, overflow: 'visible' }} className="yalla-panel yalla-surface-flip">
            {loadingLedgers ? (
              <SkeletonTaskList rows={4} />
            ) : !tasks || tasks.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Aucune mission planifiée pour le moment.</div>
            ) : (
              <div style={styles.trackingGroupsGrid} className="yalla-tracking-grid">
                {[
                  { key: 'cm', label: 'Équipe Community Management', accent: '#be185d', bg: '#fce7f3', match: (t) => (t.assigned_to || '').includes('(CM)') },
                  { key: 'prod', label: 'Équipe Production', accent: '#0369a1', bg: '#e0f2fe', match: (t) => (t.assigned_to || '').includes('(PROD)') }
                ].map(group => {
                  const groupTasks = (tasks || []).filter(group.match).filter(t => {
                    const matchesSearch = !trackingSearchQuery.trim() ||
                      (t.title || '').toLowerCase().includes(trackingSearchQuery.toLowerCase()) ||
                      (t.assigned_to || '').toLowerCase().includes(trackingSearchQuery.toLowerCase());
                    const matchesPriority = trackingPriorityFilter === 'all' || (t.priority || 'Normale') === trackingPriorityFilter;
                    return matchesSearch && matchesPriority;
                  });
                  return (
                    <div key={group.key} style={styles.trackingGroupColumn} className="yalla-surface-flip">
                      <div style={styles.trackingGroupHeader} className="yalla-divider-flip">
                        <span style={{ ...styles.trackingGroupDot, backgroundColor: group.accent }} />
                        <h3 style={styles.trackingGroupTitle} className="yalla-text-flip">{group.label}</h3>
                        <span style={{ ...styles.trackingGroupCount, backgroundColor: group.bg, color: group.accent }}>{groupTasks.length}</span>
                      </div>

                      <div style={styles.ledgerTableHeaderRow}>
                        <span style={{ flex: 1 }}>Shooting</span>
                        <span style={{ width: '160px', textAlign: 'right' }}>Priorité · Statut</span>
                      </div>

                      <div style={styles.ledgerArea} className="yalla-ledger-area">
                        {groupTasks.length === 0 ? (
                          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '18px', fontSize: '0.86rem' }}>Aucun shooting pour cette équipe.</div>
                        ) : (
                          groupTasks.map(t => {
                            const calculatedDurationStr = calculateTotalDuration(t.started_at, t.finished_at);
                            const badgeStyle = getStatusBadgeStyle(t.status);
                            const assigneeName = (t.assigned_to || '').replace(/\s*\((CM|PROD)\)\s*/i, '').trim();
                            const initials = assigneeName ? assigneeName.slice(0, 2).toUpperCase() : '?';
                            return (
                              <div key={t.id} style={{ ...styles.ledgerCardContainer, overflow: 'visible', position: 'relative' }} className="yalla-row-card yalla-row-flip">
                                <div style={styles.ledgerRowMainBlock}>
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', minWidth: 0 }}>
                                    <div style={{ ...styles.assigneeAvatar, backgroundColor: group.bg, color: group.accent }}>{initials}</div>
                                    <div style={styles.ledgerLeft}>
                                      <span style={styles.ledgerTaskTitle} className="yalla-text-flip">{t.title}</span>
                                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', color: '#64748b', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }} className="yalla-text-muted-flip">
                                        <span style={{ ...styles.assigneeNameBadge, backgroundColor: group.bg, color: group.accent }}>{assigneeName || 'Non assigné'}</span>
                                        {t.date && <span>· {t.date}</span>}

                                        {calculatedDurationStr && (
                                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f766e', fontWeight: '700', backgroundColor: '#f0fdfa', padding: '2px 8px', borderRadius: '6px' }}>
                                            <IconClock size={12} /> Temps passé : {calculatedDurationStr}
                                          </span>
                                        )}
                                      </div>
                                      {t.description && (
                                        <p style={styles.ledgerDescriptionText} className="yalla-text-muted-flip">{t.description}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                                    {isTaskOverdue(t) && (
                                      <span style={{ ...styles.statusBadge, ...getOverdueBadgeStyle() }}>En retard</span>
                                    )}
                                    <span style={{ ...styles.statusBadge, ...getPriorityBadgeStyle(t.priority) }}>{t.priority || 'Normale'}</span>
                                    <span style={{ ...styles.statusBadge, ...badgeStyle }}>{t.status}</span>

                                    {/* Context layering dropdown — fixed overflow/z-index clipping */}
                                    <div style={styles.menuAnchorWrapper}>
                                      <button
                                        style={styles.threeDotsButton} className="yalla-icon-btn"
                                        onClick={(e) => { e.stopPropagation(); setActiveTaskMenuId(activeTaskMenuId === t.id ? null : t.id); }}
                                      >
                                        <IconMore size={16} />
                                      </button>
                                      {activeTaskMenuId === t.id && (
                                        <div style={styles.dropdownPopupBox} className="yalla-surface-flip-solid" onClick={(e) => e.stopPropagation()}>
                                          <button style={styles.dropdownActionItem} onClick={() => startEditingTask(t)}><IconEdit size={13} /> Modifier</button>
                                          <button style={{ ...styles.dropdownActionItem, color: '#dc2626' }} onClick={() => handleDeleteTask(t.id)}><IconTrash size={13} /> Supprimer</button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {t?.comments && t?.comments.length > 0 && (
                                  <div style={styles.adminLedgerCommentBubble}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.82rem', color: '#1e293b', marginBottom: '4px' }} className="yalla-text-flip"><IconMessage size={13} /> Fil de discussion :</div>
                                    {(t.comments || []).map(c => (
                                      <div
                                        key={c.id}
                                        style={{ ...styles.commentRowItem, padding: '4px 0' }}
                                        onMouseEnter={() => setHoveredCommentId(c.id)}
                                        onMouseLeave={() => setHoveredCommentId(null)}
                                      >
                                        <span style={{ fontSize: '0.92rem', color: '#334155' }} className="yalla-text-flip"><b style={{ color: '#94a3b8' }}>[{c.time}]</b> {c.text}</span>

                                        {hoveredCommentId === c.id && (
                                          <div style={styles.menuAnchorWrapper}>
                                            <button style={styles.threeDotsButton} className="yalla-icon-btn" onClick={(e) => { e.stopPropagation(); setActiveMenuCommentId(activeMenuCommentId === c.id ? null : c.id); }}><IconMore size={14} /></button>
                                            {activeMenuCommentId === c.id && (
                                              <div style={styles.dropdownPopupBox} className="yalla-surface-flip-solid">
                                                <button style={{ ...styles.dropdownActionItem, color: '#dc2626' }} onClick={() => handleDeleteComment(c.id)}><IconTrash size={13} /> Supprimer</button>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {editingTaskId !== null && (
            <div
              style={{ ...styles.modalOverlay, animation: 'yallaOverlayIn 0.18s ease' }}
              onClick={cancelTaskEditing}
            >
              <div style={{ ...styles.modalCard, animation: 'yallaModalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)' }} className="yalla-surface-flip-solid" onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h3 style={{ ...styles.userTaskTitleText, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }} className="yalla-text-flip">
                    <IconEdit size={16} /> Modifier le shooting
                  </h3>
                  <button type="button" onClick={cancelTaskEditing} style={styles.modalCloseBtn} className="yalla-icon-btn">
                    <IconX size={18} />
                  </button>
                </div>
                <form onSubmit={handleSaveTaskForm} style={styles.blockForm}>
                  <input type="text" placeholder="Titre du shooting" style={styles.premiumInput} className="yalla-input-flip" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required />
                  <textarea placeholder="Instructions de prises de vue..." style={{ ...styles.premiumInput, height: '90px', resize: 'none' }} className="yalla-input-flip" value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} />
                  <input type="date" style={styles.premiumInput} className="yalla-input-flip" value={newTaskDate} onChange={e => setNewTaskDate(e.target.value)} min={todayISODate} required />
                  <select style={styles.premiumSelect} className="yalla-input-flip" value={selectedEmployeeId} onChange={e => setSelectedEmployeeId(e.target.value)} required>
                    <option value="">-- Choisir l'opérateur photo --</option>
                    {(teamList || []).map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                  </select>
                  <select style={styles.premiumSelect} className="yalla-input-flip" value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value)}>
                    <option value="Basse">Priorité basse</option>
                    <option value="Normale">Priorité normale</option>
                    <option value="Haute">Priorité haute</option>
                    <option value="Urgente">Priorité urgente</option>
                  </select>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={cancelTaskEditing} style={styles.cancelButton} className="yalla-ghost-btn">Annuler</button>
                    <button type="submit" style={{ ...styles.premiumDeployButton, backgroundColor: '#d97706', padding: '13px 22px' }} className="yalla-primary-btn">Sauvegarder les modifications</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. ADMIN ANALYTICS — brand-new insight dashboard */}
      {currentView === 'admin_analytics' && (
        <div style={styles.adminLayout}>
          <div style={styles.dashHeader}>
            <div>
              <h1 style={{ ...styles.mainHeading, display: 'flex', alignItems: 'center', gap: '10px' }} className="yalla-text-flip"><IconTarget size={26} /> Analytics</h1>
              <p style={styles.subHeading} className="yalla-text-muted-flip">Performance globale de la production en un coup d'œil</p>
            </div>
          </div>

          {!adminStats ? (
            <SkeletonAnalytics />
          ) : (
            <>
              <div style={styles.analyticsGrid} className="yalla-analytics-grid">
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#eef2ff', color: '#4338ca' }}><IconBriefcase size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">Missions totales</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{adminStats.total}</p>
                  </div>
                </div>
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#d1fae5', color: '#065f46' }}><IconCheck size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">Taux de complétion</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{adminStats.completion_rate}%</p>
                  </div>
                </div>
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#fef3c7', color: '#92400e' }}><IconClock size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">En cours</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{adminStats.in_progress}</p>
                  </div>
                </div>
                <div style={styles.analyticsCard} className="yalla-surface-flip">
                  <div style={{ ...styles.analyticsIconWrap, backgroundColor: '#fee2e2', color: '#b91c1c' }}><IconZap size={22} /></div>
                  <div>
                    <p style={styles.analyticsLabel} className="yalla-text-muted-flip">En retard</p>
                    <p style={styles.analyticsValue} className="yalla-text-flip">{adminStats.overdue}</p>
                  </div>
                </div>
              </div>

              <div style={styles.adminGridSplit}>
                {/* Completion donut */}
                <div style={styles.premiumControlBlock} className="yalla-panel yalla-surface-flip">
                  <h2 style={styles.blockTitle} className="yalla-text-flip">Répartition des statuts</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap', padding: '10px 4px' }}>
                    {(() => {
                      const size = 150, stroke = 20, r = (size - stroke) / 2, c = 2 * Math.PI * r;
                      const total = adminStats.total || 1;
                      const segs = [
                        { value: adminStats.completed, color: '#10b981' },
                        { value: adminStats.in_progress, color: '#f59e0b' },
                        { value: adminStats.pending, color: '#94a3b8' }
                      ];
                      let offsetAcc = 0;
                      return (
                        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
                          {segs.map((s, i) => {
                            const frac = s.value / total;
                            const dash = frac * c;
                            const circle = (
                              <circle
                                key={i}
                                cx={size / 2} cy={size / 2} r={r} fill="none"
                                stroke={s.color} strokeWidth={stroke}
                                strokeDasharray={`${dash} ${c - dash}`}
                                strokeDashoffset={-offsetAcc}
                                strokeLinecap="butt"
                              />
                            );
                            offsetAcc += dash;
                            return circle;
                          })}
                        </svg>
                      );
                    })()}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }} className="yalla-text-flip"><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} /> Terminé — {adminStats.completed}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }} className="yalla-text-flip"><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} /> En cours — {adminStats.in_progress}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }} className="yalla-text-flip"><span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#94a3b8', display: 'inline-block' }} /> En attente — {adminStats.pending}</div>
                    </div>
                  </div>

                  <h2 style={{ ...styles.blockTitle, marginTop: '18px' }} className="yalla-text-flip">Répartition par priorité</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Urgente', 'Haute', 'Normale', 'Basse'].map(p => {
                      const count = adminStats.priority_breakdown?.[p] || 0;
                      const pct = adminStats.total ? Math.round((count / adminStats.total) * 100) : 0;
                      const badge = getPriorityBadgeStyle(p);
                      return (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '90px', fontSize: '0.82rem', fontWeight: 700, color: badge.color }}>{p}</span>
                          <div style={{ flex: 1, height: '10px', borderRadius: '6px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', backgroundColor: badge.color, borderRadius: '6px', transition: 'width 0.4s ease' }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', width: '34px', textAlign: 'right' }} className="yalla-text-muted-flip">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Per-employee performance */}
                <div style={styles.premiumControlBlock} className="yalla-panel yalla-surface-flip">
                  <h2 style={styles.blockTitle} className="yalla-text-flip">Performance par collaborateur</h2>
                  <div style={styles.miniListArea} className="yalla-mini-list">
                    {(adminStats.per_employee || []).length === 0 ? (
                      <div style={{ textAlign: 'center', color: '#94a3b8', padding: '18px', fontSize: '0.86rem' }}>Aucune donnée disponible.</div>
                    ) : (
                      [...(adminStats.per_employee || [])].sort((a, b) => b.completion_rate - a.completion_rate).map(emp => {
                        const isCM = emp.sub_role === 'cm';
                        const accent = isCM ? '#be185d' : '#0369a1';
                        const bg = isCM ? '#fce7f3' : '#e0f2fe';
                        const initials = (emp.name || '?').trim().slice(0, 2).toUpperCase();
                        return (
                          <div key={emp.id} style={{ ...styles.miniListItem, alignItems: 'center' }} className="yalla-row-card yalla-row-flip">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                              <div style={{ ...styles.assigneeAvatar, backgroundColor: bg, color: accent, width: '34px', height: '34px', fontSize: '0.72rem' }}>{initials}</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0, flex: 1 }}>
                                <span style={{ fontSize: '0.92rem', color: '#1e293b', fontWeight: 700 }} className="yalla-text-flip">{emp.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ flex: 1, height: '8px', borderRadius: '5px', backgroundColor: '#f1f5f9', overflow: 'hidden', minWidth: '80px' }}>
                                    <div style={{ width: `${emp.completion_rate}%`, height: '100%', backgroundColor: accent, borderRadius: '5px' }} />
                                  </div>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b', whiteSpace: 'nowrap' }} className="yalla-text-muted-flip">{emp.completed}/{emp.total} • {emp.completion_rate}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <ConfirmDialog />
    </div>
  );
}

const styles = {
  backgroundWorkspace: { display: 'flex', justifyContent: 'center', width: '100vw', minHeight: '100vh', background: 'linear-gradient(180deg, #bce2f6 0%, #e3f0f8 40%, #f7fafd 75%, #ffffff 100%)', position: 'relative', boxSizing: 'border-box', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  topNavigation: { position: 'fixed', top: '24px', right: '24px', zIndex: 1000, display: 'flex', gap: '10px' },
  ghostAdminButton: { display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.8)', color: '#1e293b', padding: '9px 18px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  themeToggleFloating: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.8)', color: '#1e293b', padding: '9px', borderRadius: '10px', cursor: 'pointer' },
  themeToggleBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(248,250,252,0.9)', color: '#334155', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', marginTop: 'auto', marginBottom: '10px' },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.78)', backdropFilter: 'blur(20px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 8px 16px rgba(15,23,42,0.04), 0 24px 60px rgba(15, 23, 42, 0.1)', width: '100%', maxWidth: '520px', padding: '48px 44px', boxSizing: 'border-box' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '28px', minHeight: '130px' },
  brandLogo: { height: '130px', width: 'auto', objectFit: 'contain' },
  cardHeaderTitle: { fontSize: '1.7rem', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0', textAlign: 'center', letterSpacing: '-0.03em' },
  securityReminder: { color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 32px 0', textAlign: 'center' },
  authForm: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputContainer: { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' },
  inputIcon: { position: 'absolute', left: '16px', display: 'flex', color: '#94a3b8' },
  pillInput: { width: '100%', padding: '14px 16px 14px 44px', borderRadius: '10px', border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', fontSize: '0.96rem', outline: 'none', boxSizing: 'border-box', color: '#1e293b' },
  primaryPillButton: { backgroundColor: '#1e293b', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '0.98rem', fontWeight: '600', cursor: 'pointer' },
  errorBanner: { marginTop: '24px', padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(252, 232, 230, 0.9)', color: '#c5221f', fontSize: '0.88rem', textAlign: 'center' },
  backLinkWrapper: { display: 'flex', alignItems: 'center', gap: '6px', color: '#2b3e9a', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '24px', alignSelf: 'flex-start', width: 'fit-content' },
  lockBadgeContainer: { display: 'flex', justifyContent: 'center', marginBottom: '18px' },
  blueCircleLockBadge: { width: '54px', height: '54px', backgroundColor: '#2b3e9a', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' },
  adminCardTitle: { fontSize: '1.9rem', fontWeight: '800', color: '#111827', margin: '0 0 6px 0', textAlign: 'center', letterSpacing: '-0.03em' },
  adminCardSubtitle: { color: '#4b5563', fontSize: '0.92rem', margin: '0 0 32px 0', textAlign: 'center' },
  fieldBlockLayout: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  fieldInputLabel: { color: '#374151', fontSize: '0.88rem', fontWeight: '600' },
  primaryAdminConnectButton: { backgroundColor: '#2b3e9a', color: 'white', border: 'none', borderRadius: '10px', padding: '15px', fontSize: '0.98rem', fontWeight: '700', cursor: 'pointer', marginTop: '10px', width: '100%', boxShadow: '0 4px 14px rgba(43, 62, 154, 0.22)' },
  viewTabButton: { display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '0.86rem', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.7)', color: '#64748b' },
  viewTabButtonActive: { backgroundColor: '#2b3e9a', color: '#ffffff', boxShadow: '0 4px 14px rgba(43, 62, 154, 0.25)' },
  scheduleNavArrow: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#fff', color: '#475569', cursor: 'pointer', flexShrink: 0 },
  scheduleTodayBtn: { padding: '8px 14px', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'transparent', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' },
  scheduleHeaderStrip: { background: 'linear-gradient(120deg, #2b3e9a 0%, #4338ca 55%, #6d28d9 100%)', padding: '22px 26px' },
  scheduleNavArrowDark: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '9px', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', flexShrink: 0 },
  scheduleDateInputDark: { padding: '8px 12px', borderRadius: '9px', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', outline: 'none' },
  scheduleTodayBtnDark: { padding: '8px 14px', borderRadius: '9px', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' },
  scheduleNowDot: { position: 'absolute', top: '-5px', left: '-5px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 0 rgba(239, 68, 68, 0.6)', animation: 'yallaPulse 1.8s ease-out infinite' },

  dashboardContainer: { width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' },
  adminLayout: { width: '94%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  dashHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  mainHeading: { fontSize: '2.3rem', margin: 0, color: '#0f172a', fontWeight: '800', letterSpacing: '-0.03em' },
  subHeading: { margin: '6px 0 0 0', color: '#64748b', fontSize: '1.05rem' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#dc2626', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '0.88rem' },
  scrollArea: { display: 'flex', flexDirection: 'column', gap: '20px' },
  emptyAlert: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#64748b' },

  premiumUserCard: { backgroundColor: 'rgba(255, 255, 255, 0.78)', backdropFilter: 'blur(20px)', borderRadius: '12px', padding: '26px', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 10px rgba(15,23,42,0.03), 0 15px 35px rgba(15,23,42,0.05)', display: 'flex', flexDirection: 'column' },
  userCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' },
  userCardLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  shootingIconPrefix: { color: '#2b3e9a', display: 'flex' },
  userTaskTitleText: { margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', letterSpacing: '-0.01em' },
  userDateTextBadge: { display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '8px', fontSize: '0.86rem', fontWeight: '600' },
  interactiveStatusSelect: { padding: '8px 14px', borderRadius: '8px', fontSize: '0.86rem', fontWeight: '700', outline: 'none', cursor: 'pointer', border: '1px solid #cbd5e1' },
  cardDividerLine: { height: '1px', backgroundColor: 'rgba(0,0,0,0.06)', margin: '18px 0' },
  userTaskDescriptionParagraph: { margin: 0, color: '#334155', fontSize: '0.98rem', lineHeight: '1.6' },

  commentsHistoryBlock: { marginTop: '16px', backgroundColor: 'rgba(241,245,249,0.6)', padding: '14px 16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'visible' },
  historyTitle: { margin: '0 0 4px 0', fontSize: '0.86rem', color: '#475569', fontWeight: '700' },
  commentRowItem: { display: 'flex', gap: '10px', alignItems: 'center', position: 'relative', width: '100%', minHeight: '30px', overflow: 'visible' },
  commentTimeBadge: { color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700' },
  commentBubbleText: { margin: 0, color: '#1e293b', fontSize: '0.9rem', flex: 1 },

  menuAnchorWrapper: { position: 'relative', display: 'inline-block', overflow: 'visible' },
  threeDotsButton: { display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px', borderRadius: '6px' },
  dropdownPopupBox: { position: 'absolute', right: 0, top: '28px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '6px', minWidth: '150px' },
  dropdownActionItem: { padding: '9px 12px', background: 'none', border: 'none', textAlign: 'left', fontSize: '0.86rem', fontWeight: '600', color: '#334155', cursor: 'pointer', borderRadius: '6px', width: '100%', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' },

  commentBarLayout: { display: 'flex', gap: '12px', width: '100%' },
  commentBarInput: { flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.08)', outline: 'none', fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.9)' },
  commentBarSubmitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '10px', padding: '0 20px', fontWeight: '600', cursor: 'pointer' },

  analyticsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' },
  analyticsCard: { display: 'flex', alignItems: 'center', gap: '18px', backgroundColor: 'rgba(255, 255, 255, 0.78)', backdropFilter: 'blur(20px)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.8)', padding: '24px 26px', boxShadow: '0 4px 10px rgba(15,23,42,0.03), 0 15px 35px rgba(15,23,42,0.04)' },
  analyticsIconWrap: { width: '48px', height: '48px', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  analyticsLabel: { margin: '0 0 3px 0', fontSize: '0.88rem', color: '#64748b', fontWeight: '600' },
  analyticsValue: { margin: 0, fontSize: '1.9rem', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.02em' },

  trackingLaunchButton: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '24px', backgroundColor: 'rgba(15, 23, 42, 0.94)', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '22px 26px', cursor: 'pointer', boxShadow: '0 12px 28px rgba(15,23,42,0.18)', boxSizing: 'border-box' },
  trackingLaunchIconWrap: { width: '38px', height: '38px', borderRadius: '9px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#e0e7ff' },
  trackingLaunchTitle: { display: 'block', fontSize: '1.02rem', fontWeight: '700', letterSpacing: '-0.01em' },
  trackingLaunchSubtitle: { display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', marginTop: '3px', fontWeight: '500' },

  adminGridSplit: { display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '28px' },
  premiumControlBlock: { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(25px)', borderRadius: '14px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 10px rgba(15,23,42,0.03), 0 12px 40px rgba(15,23,42,0.04)', boxSizing: 'border-box', overflow: 'visible' },
  blockTitle: { fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', letterSpacing: '-0.01em' },
  blockDesc: { fontSize: '0.86rem', color: '#64748b', margin: '0 0 18px 0' },
  stackedForm: { display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px', marginTop: '16px' },
  actionInputGroup: { display: 'flex', gap: '12px' },
  blockForm: { display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' },
  premiumInput: { padding: '14px 18px', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.08)', outline: 'none', fontSize: '0.98rem', boxSizing: 'border-box', width: '100%', backgroundColor: 'rgba(255,255,255,0.9)', color: '#1e293b' },
  premiumSelect: { padding: '14px 18px', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.08)', outline: 'none', fontSize: '0.98rem', boxSizing: 'border-box', width: '100%', backgroundColor: 'rgba(255,255,255,0.9)', color: '#1e293b' },
  generateButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '9px', padding: '0 18px', fontWeight: '600', cursor: 'pointer' },
  premiumAddButton: { color: 'white', border: 'none', borderRadius: '9px', padding: '15px', fontWeight: '600', cursor: 'pointer', fontSize: '0.98rem' },
  cancelButton: { backgroundColor: '#94a3b8', color: 'white', border: 'none', borderRadius: '8px', padding: '11px 16px', fontWeight: '600', cursor: 'pointer', fontSize: '0.86rem' },
  premiumDeployButton: { color: 'white', border: 'none', borderRadius: '9px', padding: '15px', fontWeight: '600', cursor: 'pointer', fontSize: '0.98rem' },
  miniListArea: { flex: 1, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px', maskImage: 'linear-gradient(to bottom, black calc(100% - 24px), transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 24px), transparent 100%)' },
  miniListItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '11px', border: '1px solid rgba(0,0,0,0.03)' },
  miniListItemActive: { backgroundColor: 'rgba(43, 62, 154, 0.06)', border: '1px solid rgba(43, 62, 154, 0.25)' },
  premiumCodeBadge: { backgroundColor: '#e0e7ff', padding: '5px 12px', borderRadius: '7px', color: '#3730a3', fontWeight: '700', fontSize: '0.85rem' },
  rowIconButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },

  ledgerArea: { display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'visible', marginTop: '14px' },
  ledgerCardContainer: { display: 'flex', flexDirection: 'column', padding: '14px 20px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '8px', overflow: 'visible' },
  ledgerRowMainBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' },
  ledgerLeft: { display: 'flex', flexDirection: 'column' },
  ledgerTaskTitle: { fontWeight: '700', color: '#1e293b', fontSize: '0.98rem' },
  ledgerDescriptionText: { margin: '6px 0 0 0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' },
  statusBadge: { padding: '5px 12px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: '700' },
  adminLedgerCommentBubble: { marginTop: '10px', backgroundColor: '#f8fafc', borderLeft: '3px solid #2b3e9a', padding: '10px 14px', borderRadius: '0 8px 8px 0' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', boxSizing: 'border-box' },
  modalCard: { backgroundColor: '#ffffff', borderRadius: '14px', padding: '26px', width: '100%', maxWidth: '460px', boxShadow: '0 20px 60px rgba(15,23,42,0.25)', boxSizing: 'border-box' },
  modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' },
  modalCloseBtn: { background: 'rgba(148,163,184,0.12)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#64748b', display: 'flex' },

  confirmModalCard: { backgroundColor: '#ffffff', borderRadius: '18px', padding: '28px', width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(15,23,42,0.25)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  confirmIconWrap: { width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' },
  confirmTitle: { fontSize: '1.08rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px' },
  confirmMessage: { fontSize: '0.9rem', color: '#64748b', margin: '0 0 22px', lineHeight: 1.5 },
  confirmActions: { display: 'flex', gap: '10px', width: '100%' },
  confirmDangerButton: { flex: 1, padding: '11px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' },

  pillStatsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' },
  pillStatCard: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.8)', padding: '16px 20px', boxSizing: 'border-box' },
  pillStatDot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  pillStatValue: { fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' },
  pillStatLabel: { fontSize: '0.86rem', color: '#64748b', fontWeight: '500' },

  trackingGroupsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' },
  trackingGroupColumn: { display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%', height: 'fit-content', alignSelf: 'start', boxSizing: 'border-box', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 1px 2px rgba(15,23,42,0.03), 0 8px 24px rgba(15,23,42,0.04)', padding: '22px 24px' },
  trackingGroupHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)' },
  trackingGroupDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  trackingGroupTitle: { margin: 0, fontSize: '1.02rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.01em', flex: 1 },
  trackingGroupCount: { fontSize: '0.78rem', fontWeight: '800', padding: '3px 10px', borderRadius: '999px' },
  ledgerTableHeaderRow: { display: 'flex', justifyContent: 'space-between', padding: '0 20px 8px', fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' },
  assigneeAvatar: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '800', flexShrink: 0 },
  assigneeNameBadge: { fontWeight: '800', padding: '2px 9px', borderRadius: '6px', fontSize: '0.8rem' },

  adminSidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', width: '236px', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255, 255, 255, 0.8)', padding: '24px 16px', boxSizing: 'border-box', zIndex: 900 },
  sidebarBrandRow: { display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px', marginBottom: '28px' },
  sidebarBrandBadge: { width: '30px', height: '30px', borderRadius: '9px', backgroundColor: '#2b3e9a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sidebarBrandText: { fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' },
  sidebarNavGroup: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  sidebarNavItem: { display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#475569', fontWeight: '600', fontSize: '0.88rem', padding: '11px 12px', borderRadius: '9px', cursor: 'pointer', lineHeight: '1.25' },
  sidebarNavItemActive: { backgroundColor: 'rgba(43, 62, 154, 0.1)', color: '#2b3e9a' },
  sidebarLogoutItem: { display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#f87171', fontWeight: '600', fontSize: '0.86rem', padding: '11px 12px', borderRadius: '9px', cursor: 'pointer', textDecoration: 'none' }
};

export default App;