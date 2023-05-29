import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getDeleteFailure, getDeleteSuccess } from '../features/delete';

export function* getDelete(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'delete',
        url: `https://library-cleverland-2jfze.ondigitalocean.app/api/bookings/${action.payload.bookingId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      })
    );

    const { data: info } = response;

    yield put(getDeleteSuccess(true));
  } catch (error) {
    yield put(getDeleteFailure(true));
  }
}

export function* deleteSaga() {
  yield takeEvery('delete/getDelete', getDelete);
}
