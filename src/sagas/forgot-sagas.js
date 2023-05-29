import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getForgotFailure, getForgotSuccess } from '../features/forgot';

export function* getForgot(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/auth/forgot-password',
        data: {
          email: action.payload.email,
        },
      })
    );

    const { data: info } = response;

    yield put(getForgotSuccess(info));
  } catch (error) {
    yield put(getForgotFailure(error.message));
  }
}

export function* forgotSaga() {
  yield takeEvery('forgot/getForgot', getForgot);
}
