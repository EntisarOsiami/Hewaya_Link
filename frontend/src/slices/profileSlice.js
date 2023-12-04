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
          profilePicture: '/Avatars/defaultPlaceholder.jpg',
          userRanking: 0, 
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
        ...state.user, 
        name: {
          firstName: action.payload.data.user.name.firstName,
          lastName: action.payload.data.user.name.lastName,
        },
        username: action.payload.data.user.username,
        email: action.payload.data.user.email,
        profilePicture: action.payload.data.user.profilePicture.url,
        userRanking: action.payload.data.user.userRanking, 
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
          profilePicture: '/Avatars/defaultPlaceholder.jpg',
          userRanking: 0,
      };
      
      localStorage.removeItem('userProfile');
    },
  },
});

export const { updateUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
