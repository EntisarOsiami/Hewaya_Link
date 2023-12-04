import { createSlice } from '@reduxjs/toolkit';

const initializeStateFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
  const isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
  const userRanking = localStorage.getItem('userRanking') || 0;

  return {
    isAuthenticated: Boolean(userId),
    userId: userId || null,
    isEmailVerified,
    userRanking: parseInt(userRanking, 10),
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
      state.userRanking = data.user.userRanking || 0;

      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('isEmailVerified', data.user.email.verified.toString());
      localStorage.setItem('userRanking', data.user.userRanking.toString());
    },
    logoutRedux: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.isEmailVerified = false;
      state.userRanking = 0;

      localStorage.removeItem('userId');
      localStorage.removeItem('isEmailVerified');
      localStorage.removeItem('userRanking');
    },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
