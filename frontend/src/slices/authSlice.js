import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const {user} = action.payload;
      state.isAuthenticated = true;     
      state.userId = user._id;    
      localStorage.setItem('userId', user._id);
      console.log('User is authenticated:', state.isAuthenticated);

    },
    logoutRedux: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      localStorage.removeItem('userId');
      console.log('User is not authenticated:', state.isAuthenticated);

    },
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;

export default authSlice.reducer;
