import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/slice/authSlice';

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const tabClass = ({ isActive }) => `nav-tab${isActive ? ' active' : ''}`;

  return (
    <nav className={`site-navbar${isAuthPage ? ' minimal' : ''}`}>
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="nav-brand-dot" />
          Task Manager
        </div>

        {isAuthenticated && (
          <div className="nav-tabs">
            <NavLink to="/tasks" className={tabClass}>Tapşırıqlar</NavLink>
            <NavLink to="/profile" className={tabClass}>Profil</NavLink>
          </div>
        )}

        {isAuthenticated && (
          <div className="nav-user">
            <span className="nav-user-avatar">{user?.email?.[0]?.toUpperCase()}</span>
            <span className="nav-user-email">{user?.email}</span>
            <button className="nav-logout" onClick={handleLogout} title="Çıxış" aria-label="Çıxış">
              ⏻
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};