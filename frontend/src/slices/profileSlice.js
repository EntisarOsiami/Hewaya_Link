import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      name: '',
      email: '',
      username: '',
    },
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

export const { updateUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
