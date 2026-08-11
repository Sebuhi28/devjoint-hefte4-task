import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { loginSuccess } from '../slice/authSlice';
import { loginApi } from '../api/authApi';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/tasks';

  const onSubmit = async (data) => {
    try {
      setApiError('');
      const response = await loginApi(data);
      dispatch(loginSuccess(response));
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <p className="auth-help">Test istifadəçi: <strong>test@example.com</strong> / <strong>123456</strong></p>

      {apiError && <p className="form-error">{apiError}</p>}

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

      <button type="submit" className="primary-button auth-submit">Giriş Et</button>

      <div className="auth-actions">
        <p>Hesabınız yoxdur?</p>
        <Link to="/register" className="link-button">Qeydiyyatdan keçin</Link>
      </div>
    </form>
  );
};