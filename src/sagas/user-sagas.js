import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getUserFailure, getUserSuccess } from '../features/user';

export function* getUser(action) {
  try {
    const response = yield call(() =>
      axios
        .get(`https://library-cleverland-2jfze.ondigitalocean.app/api/users/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
        .then((resp) => resp)
    );

    const { data: info } = response;

    yield put(getUserSuccess(info));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

export function* userSaga() {
  yield takeEvery('user/getUser', getUser);
}
