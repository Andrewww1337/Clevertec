import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getBookFailure, getBookSuccess } from '../features/book';
import { crutch } from './crutch';

export function* getBook(action) {
  try {
    const response = yield call(() =>
      axios
        .get(`https://library-cleverland-2jfze.ondigitalocean.app${action.payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
        .then((resp) => resp)
    );

    const { data: info } = response;

    if (Array.isArray(info)) {
      yield put(getBookSuccess(crutch));
    } else {
      yield put(getBookSuccess(info));
    }
  } catch (error) {
    yield put(getBookFailure(error.message));
  }
}

export function* bookSaga() {
  yield takeEvery('book/getBook', getBook);
}
