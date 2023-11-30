import { createSlice } from '@reduxjs/toolkit';

const initializeStateFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
  const isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';  

  return {
    isAuthenticated: Boolean(userId),
    userId: userId || null,
    isEmailVerified
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
      state.isEmailVerified = data.user.email.verified;

      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('isEmailVerified', data.user.email.verified.toString());  
    },
    logoutRedux: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.isEmailVerified = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('isEmailVerified');  
    },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
