import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getRegistrationFailure, getRegistrationSuccess } from '../features/registration';

export function* getRegistration(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/auth/local/register',
        data: {
          email: action.payload.email,
          username: action.payload.username,
          password: action.payload.password,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
        },
      })
    );

    const { data: info } = response;

    yield put(getRegistrationSuccess(info));
  } catch (error) {
    yield put(getRegistrationFailure(error.message));
  }
}

export function* registrationSaga() {
  yield takeEvery('registration/getRegistration', getRegistration);
}
