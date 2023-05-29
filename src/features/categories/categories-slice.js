import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    content: null,
    isLoading: 'idle',
    error: null,
  },
  reducers: {
    getCategories: (state, action) => {
      if (state.isLoading === 'idle') {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'pending';
      }
    },
    getCategoriesSuccess: (state, action) => {
      if (state.isLoading === 'pending') {
        if (state.content === null) {
          // eslint-disable-next-line no-param-reassign
          state.content = action.payload;
        }
        // eslint-disable-next-line no-param-reassign
        state.isLoading = 'idle';
      }
    },
    getCategoriesFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = 'idle';
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { getCategories, getCategoriesSuccess, getCategoriesFailure } = categoriesSlice.actions;

// eslint-disable-next-line import/no-default-export
export default categoriesSlice.reducer;
