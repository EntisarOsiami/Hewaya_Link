import { createSlice } from '@reduxjs/toolkit';

const initializeStateFromLocalStorage = () => {
  const savedUserId = localStorage.getItem('userId');

  return {
    isAuthenticated: !!savedUserId,
    userId: savedUserId || null,
  };
};

const initialState = initializeStateFromLocalStorage(); 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const { data } = action.payload;
      state.isAuthenticated = true;
      state.userId = data.user._id;
      localStorage.setItem('userId', data.user._id);
    },
    logoutRedux: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem('userId');
    },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
