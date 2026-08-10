import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slice/authSlice';
import taskReducer from '../../features/tasks/slice/taskSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});