import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="auth-layout">
      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <div className="auth-logo">TM</div>
          <h1>Task Manager</h1>
          <p>Tapşırıqlarını izlə, prioritetləşdir və vaxtında bitir.</p>
          <ul className="auth-feature-list">
            <li>Sadə və sürətli tapşırıq idarəetməsi</li>
            <li>Real vaxtda status yenilənməsi</li>
            <li>Bütün cihazlardan əlçatan</li>
          </ul>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-panel-inner">
          <div className="auth-form-head">
            <h2>Xoş gəlmisiniz</h2>
            <p className="page-description">Hesabınıza daxil olun və işə davam edin.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};