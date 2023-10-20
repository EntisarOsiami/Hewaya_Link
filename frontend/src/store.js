import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js'
import profileSlice from './slices/profileSlice.js';
import { apiSlice } from './slices/apiSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,     
    profile: profileSlice, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
