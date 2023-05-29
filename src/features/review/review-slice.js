/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getReview: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getReviewSuccess: (state, action) => {
      if (action.payload === null) {
        state.content = null;
      }
      if (state.isLoading === 'pending') {
        state.content = true;
        sessionStorage.setItem('recovering', 'recovering');
        state.error = null;
        state.isLoading = 'idle';
      }
    },
    getReviewFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getReview, getReviewSuccess, getReviewFailure } = reviewSlice.actions;

// eslint-disable-next-line import/no-default-export
export default reviewSlice.reducer;
