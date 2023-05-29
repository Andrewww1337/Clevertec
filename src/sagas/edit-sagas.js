import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getEditFailure, getEditSuccess } from '../features/edit';

export function* getEdit(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'put',
        url: `https://library-cleverland-2jfze.ondigitalocean.app/api/users/${localStorage.getItem('user')}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        data: {
          email: action.payload.email,
          username: action.payload.login,
          password: action.payload.password,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
        },
      })
    );

    const { data: info } = response;

    yield put(getEditSuccess(info));
  } catch (error) {
    yield put(getEditFailure(error.message));
  }
}

export function* editSaga() {
  yield takeEvery('edit/getEdit', getEdit);
}
