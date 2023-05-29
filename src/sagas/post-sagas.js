import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getPostFailure, getPostSuccess } from '../features/posts';

export function* getPost(action) {
  try {
    const response = yield call(() =>
      axios
        .get(`https://library-cleverland-2jfze.ondigitalocean.app${action.payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
        .then((resp) => resp)
    );

    const { data: info } = response;

    yield put(getPostSuccess(info));
  } catch (error) {
    yield put(getPostFailure(error.message));
  }
}

export function* postSaga() {
  yield takeEvery('posts/getPost', getPost);
}
