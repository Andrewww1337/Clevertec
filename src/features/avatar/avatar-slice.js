/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getAvatar: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getAvatarSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;

        state.error = null;
        state.isLoading = 'idle';
      }
      if (action.payload === null) {
        state.content = action.payload;
      }
    },
    getAvatarFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getAvatar, getAvatarSuccess, getAvatarFailure } = avatarSlice.actions;

// eslint-disable-next-line import/no-default-export
export default avatarSlice.reducer;
