import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask, toggleTask, updateTask } from '../slice/taskSlice';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { useToast } from '../../../components/feedback/ToastProvider';

const PRIORITY_LABELS = {
  low: 'Aşağı',
  medium: 'Orta',
  high: 'Yüksək',
};

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const handleToggle = () => {
    dispatch(toggleTask(task));
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);
    try {
      await dispatch(deleteTask(task.id)).unwrap();
      addToast('Tapşırıq silindi', 'success');
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

  if (isEditing) {
    return (
      <div className="task-card task-card-editing">
        <button
          type="button"
          className={`toggle-button ${task.completed ? 'completed' : ''}`}
          onClick={handleToggle}
        >
          {task.completed ? '✔' : '○'}
        </button>

        <div className="task-edit-fields">
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="task-edit-row">
            <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Aşağı prioritet</option>
              <option value="medium">Orta prioritet</option>
              <option value="high">Yüksək prioritet</option>
            </select>
            <input
              type="date"
              className="form-input"
              value={dueDate || ''}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="task-edit-actions">
          <button type="button" className="primary-button task-save-btn" onClick={handleSave}>Yadda saxla</button>
          <button type="button" className="ghost-button" onClick={handleCancel}>Ləğv et</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="task-card">
        <button
          type="button"
          className={`toggle-button ${task.completed ? 'completed' : ''}`}
          onClick={handleToggle}
        >
          {task.completed ? '✔' : '○'}
        </button>

        <div className="task-info">
          <Link to={`/tasks/${task.id}`} className={`task-title ${task.completed ? 'task-done' : ''}`}>
            {task.title}
          </Link>
          <div className="task-meta">
            <span className={`priority-badge priority-${task.priority || 'medium'}`}>
              {PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium}
            </span>
            {task.dueDate && <span className="due-date-badge">📅 {task.dueDate}</span>}
          </div>
        </div>

        <div className="task-actions">
          <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Redaktə</button>
          <button type="button" className="danger-button" onClick={() => setShowConfirm(true)}>Sil</button>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="Tapşırığı sil"
        message={`"${task.title}" tapşırığını silmək istədiyinizə əminsiniz?`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};