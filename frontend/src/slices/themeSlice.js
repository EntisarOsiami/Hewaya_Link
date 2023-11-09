import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTheme: localStorage.getItem('theme') || 'light', }

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      state.currentTheme = newTheme;
      localStorage.setItem('theme', newTheme);
    },
    setInitialTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setInitialTheme } = themeSlice.actions;

export default themeSlice.reducer;