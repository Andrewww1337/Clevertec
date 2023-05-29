import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getRegistration: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getRegistrationSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        // eslint-disable-next-line no-param-reassign
        state.content = true;
        // eslint-disable-next-line no-param-reassign
        state.error = null;
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'idle';
      } else if (action.payload === null) {
        // eslint-disable-next-line no-param-reassign
        state.content = action.payload;
      }
    },
    getRegistrationFailure: (state, action) => {
      if (action.payload === null) {
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload;
      }
      // eslint-disable-next-line no-param-reassign
      state.isLoading = 'idle';
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { getRegistration, getRegistrationSuccess, getRegistrationFailure } = registrationSlice.actions;

// eslint-disable-next-line import/no-default-export
export default registrationSlice.reducer;
