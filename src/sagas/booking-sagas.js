import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getBookingFailure, getBookingSuccess } from '../features/booking';

export function* getBooking(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/bookings',
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

    yield put(getBookingSuccess(info));
  } catch (error) {
    yield put(getBookingFailure(error.message));
  }
}

export function* bookingSaga() {
  yield takeEvery('booking/getBooking', getBooking);
}
