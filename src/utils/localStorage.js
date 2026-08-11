const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const EXPIRY_KEY = 'auth_expiry';

const isExpired = (expiresAt) => {
  if (!expiresAt) return true;
  return Date.now() > Number(expiresAt);
};

export const getStoredToken = () => {
  const expiresAt = localStorage.getItem(EXPIRY_KEY);
  if (isExpired(expiresAt)) {
    clearAuthData();
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  const expiresAt = localStorage.getItem(EXPIRY_KEY);
  if (isExpired(expiresAt)) {
    clearAuthData();
    return null;
  }
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setAuthData = (token, user) => {
  const expiresAt = Date.now() + 1000 * 60 * 5; // 5 dəqiqəlik sessiya
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};