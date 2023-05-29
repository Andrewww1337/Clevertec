import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getRecoveryFailure, getRecoverySuccess } from '../features/recovery';

export function* getRecovery(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/auth/reset-password',
        data: {
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
          code: action.payload.code,
        },
      })
    );

    const { data: info } = response;

    yield put(getRecoverySuccess(info));
  } catch (error) {
    yield put(getRecoveryFailure(error.message));
  }
}

export function* recoverySaga() {
  yield takeEvery('recovery/getRecovery', getRecovery);
}
