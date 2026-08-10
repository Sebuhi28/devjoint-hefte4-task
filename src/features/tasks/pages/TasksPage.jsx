import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../slice/taskSlice';
import { TaskForm } from '../components/TaskForm';
import { TaskCard } from '../components/TaskCard';
import { StaleClosureDemo } from '../components/StaleClosureDemo';
import { ErrorBoundary } from '../../../components/feedback/ErrorBoundary';

export const TasksPage = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 15px' }}>
      <h2>Tapşırıqlar Siyahısı</h2>
      
      {/* Error Boundary ilə mühafizə olunan form hissəsi */}
      <ErrorBoundary>
        <TaskForm />
      </ErrorBoundary>

      {/* Stale Closure nümayiş komponenti */}
      <StaleClosureDemo />

      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && tasks.length === 0 && <p>Hələ heç bir tapşırıq yoxdur.</p>}

      {/* Siyahının Error Boundary ilə bükülməsi */}
      <ErrorBoundary>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ErrorBoundary>
    </div>
  );
};