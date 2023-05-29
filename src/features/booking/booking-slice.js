import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getBooking: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getBookingSuccess: (state, action) => {
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
    getBookingFailure: (state, action) => {
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

export const { getBooking, getBookingSuccess, getBookingFailure } = bookingSlice.actions;

// eslint-disable-next-line import/no-default-export
export default bookingSlice.reducer;
