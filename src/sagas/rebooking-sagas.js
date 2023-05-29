import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getRebookingFailure, getRebookingSuccess } from '../features/rebooking';

export function* getRebooking(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'put',
        url: `https://library-cleverland-2jfze.ondigitalocean.app/api/bookings/${action.payload.bookingId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        data: {
          data: {
            order: action.payload.order,
            dateOrder: action.payload.dateBooking,
            book: action.payload.bookId,
            customer: action.payload.userId,
          },
        },
      })
    );

    const { data: info } = response;

    yield put(getRebookingSuccess(info));
  } catch (error) {
    yield put(getRebookingFailure(error.message));
  }
}

export function* rebookingSaga() {
  yield takeEvery('rebooking/getRebooking', getRebooking);
}
