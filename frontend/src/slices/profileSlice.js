import { createSlice } from '@reduxjs/toolkit';

const initializeStateFromLocalStorage = () => {
  const savedUserProfile = localStorage.getItem('userProfile');

  return {
    user: savedUserProfile
      ? JSON.parse(savedUserProfile)
      : {
        name: {
          firstName: '',
          lastName: '',
        },
        username: '',
        email: '',
      },
  };
};

const initialState = initializeStateFromLocalStorage();

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = {
        name: {
          firstName: action.payload.data.user.name.firstName,
          lastName: action.payload.data.user.name.lastName,
        },
        username: action.payload.data.user.username,
        email: action.payload.data.user.email,
      };

      localStorage.setItem('userProfile', JSON.stringify(state.user));
    },
    clearUserProfile: (state) => {
      state.user = {
        name: {
          firstName: '',
          lastName: '',
        },
        username: '',
        email: '',
      };
      
      localStorage.removeItem('userProfile');
    },
  },
});

export const { updateUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
