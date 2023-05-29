import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getBook: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getBookSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        // eslint-disable-next-line no-param-reassign
        state.content = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'idle';
      }
    },
    getBookFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = 'idle';
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { getBook, getBookSuccess, getBookFailure } = bookSlice.actions;

// eslint-disable-next-line import/no-default-export
export default bookSlice.reducer;
