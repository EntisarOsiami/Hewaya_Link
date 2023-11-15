import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    blogsFetched: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, blogsFetched, setCurrentBlog, clearCurrentBlog, setError } = blogSlice.actions;

export default blogSlice.reducer;
