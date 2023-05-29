import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getPost: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getPostSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        if (state.content === null || state.content !== action.payload) {
          // eslint-disable-next-line no-param-reassign
          state.content = action.payload;
          // eslint-disable-next-line no-param-reassign
          state.isLoading = 'idle';
        }
      }
    },
    getPostFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = 'idle';
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { getPost, getPostSuccess, getPostFailure } = postsSlice.actions;

// eslint-disable-next-line import/no-default-export
export default postsSlice.reducer;
