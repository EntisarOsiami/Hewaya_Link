import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js'
import profileSlice from './slices/profileSlice.js';
import { apiSlice } from './slices/apiSlice.js';
import themeReducer from './slices/themeSlice.js';
import blogSlice from './slices/blogSlice.js';
import { blogApiSlice } from './slices/blogApiSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,     
    profile: profileSlice,
    theme: themeReducer, 
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
    blog: blogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, blogApiSlice.middleware),
  devTools: true,
});


export default store;
