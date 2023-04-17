import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
