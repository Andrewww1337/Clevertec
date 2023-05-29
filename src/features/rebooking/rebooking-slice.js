import { createSlice } from '@reduxjs/toolkit';

export const rebookingSlice = createSlice({
  name: 'rebooking',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getRebooking: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getRebookingSuccess: (state, action) => {
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
    getRebookingFailure: (state, action) => {
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

export const { getRebooking, getRebookingSuccess, getRebookingFailure } = rebookingSlice.actions;

// eslint-disable-next-line import/no-default-export
export default rebookingSlice.reducer;
