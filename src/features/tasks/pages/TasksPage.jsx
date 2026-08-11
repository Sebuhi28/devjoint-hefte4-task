import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../slice/taskSlice';
import { TaskForm } from '../components/TaskForm';
import { TaskCard } from '../components/TaskCard';
import { ErrorBoundary } from '../../../components/feedback/ErrorBoundary';

export const TasksPage = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { total, completed, pending } = useMemo(() => {
    const completedCount = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed: completedCount,
      pending: tasks.length - completedCount,
    };
  }, [tasks]);

  return (
    <section className="page-section">
      <div className="page-header">
        <h2>Tapşırıqlar Siyahısı</h2>
      </div>

      <div className="task-stats">
        <div className="stat-pill">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Toplam</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">{pending}</span>
          <span className="stat-label">Gözləyən</span>
        </div>
        <div className="stat-pill stat-pill-success">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Tamamlanmış</span>
        </div>
      </div>

      <ErrorBoundary>
        <TaskForm />
      </ErrorBoundary>

      {loading && <p className="status-message">Yüklənir...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>Hələ heç bir tapşırıq yoxdur. Yuxarıdan əlavə et.</p>
        </div>
      )}

      <ErrorBoundary>
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </ErrorBoundary>
    </section>
  );
};