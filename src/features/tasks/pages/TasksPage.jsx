import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../slice/taskSlice';
import { TaskForm } from '../components/TaskForm';
import { TaskCard } from '../components/TaskCard';
import { ErrorBoundary } from '../../../components/feedback/ErrorBoundary';
import { useDebounce } from '../../../utils/useDebounce';

const FILTERS = [
  { key: 'all', label: 'Hamısı' },
  { key: 'active', label: 'Aktiv' },
  { key: 'completed', label: 'Tamamlanmış' },
];

export const TasksPage = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && !task.completed) ||
        (statusFilter === 'completed' && task.completed);

      const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, debouncedSearch]);

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

      <div className="task-toolbar">
        <input
          type="text"
          className="form-input task-search-input"
          placeholder="Tapşırıq axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-tabs">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`filter-tab ${statusFilter === filter.key ? 'active' : ''}`}
              onClick={() => setStatusFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="status-message">Yüklənir...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>Hələ heç bir tapşırıq yoxdur. Yuxarıdan əlavə et.</p>
        </div>
      )}

      {!loading && tasks.length > 0 && filteredTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p>Axtarışa uyğun tapşırıq tapılmadı.</p>
        </div>
      )}

      <ErrorBoundary>
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </ErrorBoundary>
    </section>
  );
};