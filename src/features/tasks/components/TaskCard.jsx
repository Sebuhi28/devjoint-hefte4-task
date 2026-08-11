import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask, updateTask } from '../slice/taskSlice';

const PRIORITY_LABELS = {
  low: 'Aşağı',
  medium: 'Orta',
  high: 'Yüksək',
};

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleTask(task));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    dispatch(updateTask({ id: task.id, changes: { title, priority, dueDate: dueDate || null } }));
    setIsEditing(false);
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
    <div className="task-card">
      <button
        type="button"
        className={`toggle-button ${task.completed ? 'completed' : ''}`}
        onClick={handleToggle}
      >
        {task.completed ? '✔' : '○'}
      </button>

      <div className="task-info">
        <span className={`task-title ${task.completed ? 'task-done' : ''}`}>{task.title}</span>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority || 'medium'}`}>
            {PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium}
          </span>
          {task.dueDate && <span className="due-date-badge">📅 {task.dueDate}</span>}
        </div>
      </div>

      <div className="task-actions">
        <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Redaktə</button>
        <button type="button" className="danger-button" onClick={handleDelete}>Sil</button>
      </div>
    </div>
  );
};