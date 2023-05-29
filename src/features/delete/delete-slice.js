import { createSlice } from '@reduxjs/toolkit';

export const deleteSlice = createSlice({
  name: 'delete',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getDelete: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getDeleteSuccess: (state, action) => {
      if (action.payload === null) {
        // eslint-disable-next-line no-param-reassign
        state.content = action.payload;
      }
      if (state.isLoading === 'pending') {
        // eslint-disable-next-line no-param-reassign
        state.content = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'idle';
      }
    },
    getDeleteFailure: (state, action) => {
      if (action.payload === null) {
        // eslint-disable-next-line no-param-reassign
        state.content = action.payload;
      }
      // eslint-disable-next-line no-param-reassign
      state.isLoading = 'idle';
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { getDelete, getDeleteSuccess, getDeleteFailure } = deleteSlice.actions;

// eslint-disable-next-line import/no-default-export
export default deleteSlice.reducer;
