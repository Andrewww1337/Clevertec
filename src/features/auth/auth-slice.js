/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getAuth: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getAuthSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;

        localStorage.setItem('jwt', action.payload.jwt);
        sessionStorage.setItem('jwt', action.payload.jwt);
        sessionStorage.setItem('user', action.payload.user.id);
        localStorage.setItem('user', action.payload.user.id);
        state.error = null;
        state.isLoading = 'idle';
      }
      if (action.payload === null) {
        state.content = action.payload;
      }
    },
    getAuthFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getAuth, getAuthSuccess, getAuthFailure } = authSlice.actions;

// eslint-disable-next-line import/no-default-export
export default authSlice.reducer;
