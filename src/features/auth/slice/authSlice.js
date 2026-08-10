import { createSlice } from '@reduxjs/toolkit';
import { getStoredToken, getStoredUser, setAuthData, clearAuthData } from '../../../utils/localStorage';

const initialToken = getStoredToken();
const initialUser = getStoredUser();

const initialState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      setAuthData(token, user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      clearAuthData();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;