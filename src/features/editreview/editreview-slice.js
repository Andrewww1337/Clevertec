/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const editReviewSlice = createSlice({
  name: 'editReview',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getEditReview: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getEditReviewSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;

        state.error = null;
        state.isLoading = 'idle';
      }
      if (action.payload === null) {
        state.content = action.payload;
      }
    },
    getEditReviewFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getEditReview, getEditReviewSuccess, getEditReviewFailure } = editReviewSlice.actions;

// eslint-disable-next-line import/no-default-export
export default editReviewSlice.reducer;
