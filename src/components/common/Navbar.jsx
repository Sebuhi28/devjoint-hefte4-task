import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/slice/authSlice';

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Token və user məlumatları təmizlənir
    navigate('/login', { replace: true }); // Geri düyməsi ilə qorunan səhifəyə qayıtmağı bloklayır
  };

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f0f0f0' }}>
      {isAuthenticated ? (
        <>
          <Link to="/tasks">Tapşırıqlar</Link>
          <Link to="/profile">Profil ({user?.email})</Link>
          <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Çıxış Et (Logout)</button>
        </>
      ) : (
        <Link to="/login">Daxil Ol</Link>
      )}
    </nav>
  );
};