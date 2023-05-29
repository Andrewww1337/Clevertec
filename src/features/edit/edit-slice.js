/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edit',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getEdit: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    getEditSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        state.content = true;

        state.error = null;
        state.isLoading = 'idle';
      }
      if (action.payload === null) {
        state.content = action.payload;
      }
    },
    getEditFailure: (state, action) => {
      state.isLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const { getEdit, getEditSuccess, getEditFailure } = editSlice.actions;

// eslint-disable-next-line import/no-default-export
export default editSlice.reducer;
