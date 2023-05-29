/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getUserSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = action.payload;

        state.isLoading = 'idle';
      }
    },
    getUserFailure: (state, action) => {
      state.isLoading = 'idle';

      state.error = action.payload;
    },
  },
});

export const { getUser, getUserSuccess, getUserFailure } = userSlice.actions;

// eslint-disable-next-line import/no-default-export
export default userSlice.reducer;
