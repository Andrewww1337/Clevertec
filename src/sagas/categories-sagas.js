import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getCategoriesFailure, getCategoriesSuccess } from '../features/categories';

export function* getCategories(action) {
  try {
    const response = yield call(() =>
      axios
        .get(`https://library-cleverland-2jfze.ondigitalocean.app${action.payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
        .then((resp) => resp)
    );

    const { data: info } = response;

    yield put(getCategoriesSuccess(info));
  } catch (error) {
    yield put(getCategoriesFailure(error.message));
  }
}

export function* categoriesSaga() {
  yield takeEvery('categories/getCategories', getCategories);
}
