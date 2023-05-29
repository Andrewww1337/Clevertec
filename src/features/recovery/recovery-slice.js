/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getRecovery: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getRecoverySuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;
        localStorage.removeItem('recovering');
        state.isLoading = 'idle';
        if (action.payload === null) {
          state.content = action.payload;
        }
      }
    },
    getRecoveryFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getRecovery, getRecoverySuccess, getRecoveryFailure } = recoverySlice.actions;

// eslint-disable-next-line import/no-default-export
export default recoverySlice.reducer;
