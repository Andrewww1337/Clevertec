import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getAuthFailure, getAuthSuccess } from '../features/auth';

export function* getAuth(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/auth/local',
        data: {
          identifier: action.payload.identifier,
          password: action.payload.password,
        },
      })
    );

    const { data: info } = response;

    yield put(getAuthSuccess(info));
  } catch (error) {
    yield put(getAuthFailure(error.message));
  }
}

export function* authSaga() {
  yield takeEvery('auth/getAuth', getAuth);
}
