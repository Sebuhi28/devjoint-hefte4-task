import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../slice/taskSlice';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { useToast } from '../../../components/feedback/ToastProvider';

const PRIORITY_LABELS = {
  low: 'Aşağı',
  medium: 'Orta',
  high: 'Yüksək',
};

export const TaskDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { items: tasks, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((item) => item.id === id);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);
    try {
      await dispatch(deleteTask(task.id)).unwrap();
      addToast('Tapşırıq silindi', 'success');
      navigate('/tasks');
    } catch {
      addToast('Silinmə zamanı xəta baş verdi', 'error');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    try {
      await dispatch(updateTask({ id: task.id, changes: { title, priority, dueDate: dueDate || null } })).unwrap();
      setIsEditing(false);
      addToast('Tapşırıq yeniləndi', 'success');
    } catch {
      addToast('Yenilənmə zamanı xəta baş verdi', 'error');
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setPriority(task.priority || 'medium');
    setDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  if (loading && !task) {
    return (
      <section className="page-section page-section-narrow">
        <p className="status-message">Yüklənir...</p>
      </section>
    );
  }

  if (!task) {
    return (
      <section className="page-section page-section-narrow">
        <div className="page-header">
          <h2>Tapşırıq tapılmadı</h2>
          <p className="page-description">Bu tapşırıq mövcud deyil və ya silinib.</p>
        </div>
        <Link to="/tasks" className="link-button">← Tapşırıqlara qayıt</Link>
      </section>
    );
  }

  return (
    <section className="page-section page-section-narrow">
      <Link to="/tasks" className="back-link">← Tapşırıqlara qayıt</Link>

      {isEditing ? (
        <>
          <div className="page-header">
            <h2>Tapşırığı redaktə et</h2>
          </div>

          <div className="task-edit-fields detail-edit-fields">
            <div className="task-form-field">
              <label className="form-label">Başlıq</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="task-edit-row">
              <div className="task-form-field">
                <label className="form-label">Prioritet</label>
                <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Aşağı prioritet</option>
                  <option value="medium">Orta prioritet</option>
                  <option value="high">Yüksək prioritet</option>
                </select>
              </div>

              <div className="task-form-field">
                <label className="form-label">Son tarix</label>
                <input
                  type="date"
                  className="form-input"
                  value={dueDate || ''}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button type="button" className="ghost-button" onClick={handleCancel}>Ləğv et</button>
            <button type="button" className="primary-button" onClick={handleSave}>Yadda saxla</button>
          </div>
        </>
      ) : (
        <>
          <div className="page-header">
            <h2>{task.title}</h2>
            <div className="task-meta">
              <span className={`priority-badge ${task.completed ? 'priority-low' : 'priority-medium'}`}>
                {task.completed ? 'Tamamlanıb' : 'Gözləyir'}
              </span>
              <span className={`priority-badge priority-${task.priority || 'medium'}`}>
                {PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium}
              </span>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-card-label">Status</span>
              <span className="detail-card-value">{task.completed ? 'Tamamlanıb' : 'Gözləyir'}</span>
            </div>
            <div className="detail-card">
              <span className="detail-card-label">Prioritet</span>
              <span className="detail-card-value">{PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium}</span>
            </div>
            <div className="detail-card">
              <span className="detail-card-label">Son tarix</span>
              <span className="detail-card-value">{task.dueDate || 'Təyin olunmayıb'}</span>
            </div>
            <div className="detail-card">
              <span className="detail-card-label">Tapşırıq ID</span>
              <span className="detail-card-value detail-card-id">{task.id}</span>
            </div>
          </div>

          <div className="detail-actions">
            <button type="button" className="edit-button detail-edit-btn" onClick={() => setIsEditing(true)}>
              Redaktə et
            </button>
            <button type="button" className="danger-button" onClick={() => setShowConfirm(true)}>
              Tapşırığı sil
            </button>
          </div>
        </>
      )}

      <ConfirmDialog
        open={showConfirm}
        title="Tapşırığı sil"
        message={`"${task.title}" tapşırığını silmək istədiyinizə əminsiniz?`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowConfirm(false)}
      />
    </section>
  );
};