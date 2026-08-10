import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { TasksPage } from '../../features/tasks/pages/TasksPage'; // Real səhifə
import { Navbar } from '../../components/common/Navbar';

const ProfilePlaceholder = () => <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Profil Səhifəsi</h2>;

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/profile" element={<ProfilePlaceholder />} />
        </Route>

        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </>
  );
};