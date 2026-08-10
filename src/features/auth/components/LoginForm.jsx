import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { loginSuccess } from '../slice/authSlice';
import { loginApi } from '../api/authApi';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // İstifadəçi hardan yönləndirilmişdisə, login-dən sonra oraya qayıtsın
  const from = location.state?.from?.pathname || '/tasks';

  const onSubmit = async (data) => {
    try {
      setApiError('');
      const response = await loginApi(data);
      dispatch(loginSuccess(response));
      // replace: true ilə /login səhifəsini tarixçədən silirik (Back düyməsi üçün)
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '350px', margin: '20px auto' }}>
      <h2>Daxil Ol</h2>
      
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}

      <div style={{ marginBottom: '10px' }}>
        <label>Email (test@example.com):</label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email mütləqdir',
            pattern: { value: /^\S+@\S+$/i, message: 'Düzgün email yazın' }
          })}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Şifrə (123456):</label>
        <input
          type="password"
          {...register('password', { 
            required: 'Şifrə mütləqdir',
            minLength: { value: 6, message: 'Şifrə minimum 6 simvol olmalıdır' }
          })}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
      </div>

      <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Giriş Et</button>
    </form>
  );
};