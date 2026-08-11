import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slice/authSlice';
import { registerApi } from '../api/authApi';

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setApiError('');
      const response = await registerApi(data);
      dispatch(loginSuccess(response));
      navigate('/tasks', { replace: true });
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <div className="auth-logo">TM</div>
          <h1>Task Manager</h1>
          <p>Bir neçə saniyəyə hesab yarat və başla.</p>
          <ul className="auth-feature-list">
            <li>Pulsuz və sürətli qeydiyyat</li>
            <li>Şəxsi tapşırıq siyahın</li>
            <li>Məlumatların brauzerində saxlanır</li>
          </ul>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-panel-inner">
          <div className="auth-form-head">
            <h2>Hesab yarat</h2>
            <p className="page-description">Qeydiyyatdan keç və tapşırıqlarını idarə etməyə başla.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {apiError && <p className="form-error">{apiError}</p>}

            <div className="form-field">
              <label className="form-label">Ad</label>
              <input
                type="text"
                className="form-input"
                {...register('name', {
                  required: 'Ad mütləqdir',
                  minLength: { value: 2, message: 'Ad ən azı 2 simvol olmalıdır' }
                })}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                {...register('email', {
                  required: 'Email mütləqdir',
                  pattern: { value: /^\S+@\S+$/i, message: 'Düzgün email yazın' }
                })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Şifrə</label>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  {...register('password', {
                    required: 'Şifrə mütləqdir',
                    minLength: { value: 6, message: 'Şifrə minimum 6 simvol olmalıdır' }
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Gizlət' : 'Göstər'}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="primary-button auth-submit">Qeydiyyat</button>
          </form>

          <div className="auth-actions">
            <p>Hesabınız artıq varsa</p>
            <Link to="/login" className="link-button">Daxil olun</Link>
          </div>
        </div>
      </div>
    </div>
  );
};