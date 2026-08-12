import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { TasksPage } from '../../features/tasks/pages/TasksPage';
import { TaskDetailPage } from '../../features/tasks/pages/TaskDetailPage';
import { ProfilePage } from '../../features/profile/pages/ProfilePage';
import { Navbar } from '../../components/common/Navbar';

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </div>
    </>
  );
};