import { api } from '../../../services/apiConfig';

export const loginApi = async (credentials) => {
  // Mock API üçün email yoxlanışı
  // Real layihədə backend-ə POST sorğusu atılır: await api.post('/login', credentials)
  if (credentials.email === 'test@example.com' && credentials.password === '123456') {
    return {
      user: { id: '1', email: credentials.email, name: 'Developer User' },
      token: 'fake-jwt-token-12345',
    };
  }
  throw new Error('Email və ya şifrə yanlışdır!');
};