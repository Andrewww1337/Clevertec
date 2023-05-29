/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const forgotSlice = createSlice({
  name: 'forgot',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getForgot: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getForgotSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;
        sessionStorage.setItem('recovering', 'recovering');
        state.error = null;
        state.isLoading = 'idle';
      }
    },
    getForgotFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getForgot, getForgotSuccess, getForgotFailure } = forgotSlice.actions;

// eslint-disable-next-line import/no-default-export
export default forgotSlice.reducer;
