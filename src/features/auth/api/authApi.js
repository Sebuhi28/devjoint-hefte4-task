const STORAGE_KEY = 'mock_users';

const loadUsers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const createSession = (user) => ({
  user,
  token: `fake-jwt-token-${user.id}-${Date.now()}`,
});

export const loginApi = async (credentials) => {
  const users = loadUsers();
  const normalizedEmail = credentials.email.toLowerCase();
  const user = users.find((item) => item.email === normalizedEmail);

  if (user && user.password === credentials.password) {
    return createSession({ id: user.id, email: user.email, name: user.name });
  }

  if (normalizedEmail === 'test@example.com' && credentials.password === '123456') {
    return createSession({ id: '1', email: normalizedEmail, name: 'Developer User' });
  }

  throw new Error('Email və ya şifrə yanlışdır!');
};

export const registerApi = async ({ name, email, password }) => {
  const users = loadUsers();
  const normalizedEmail = email.toLowerCase();
  const exists = users.some((item) => item.email === normalizedEmail);

  if (exists) {
    throw new Error('Bu email artıq istifadə olunur. Başqa email seçin.');
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email: normalizedEmail,
    password,
  };

  saveUsers([...users, newUser]);
  return createSession({ id: newUser.id, email: newUser.email, name: newUser.name });
};
