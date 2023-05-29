import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getReviewFailure, getReviewSuccess } from '../features/review';

export function* getReview(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/comments',
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        data: {
          data: {
            user: action.payload.user,
            rating: action.payload.rating,
            text: action.payload.text,
            book: action.payload.book,
          },
        },
      })
    );

    const { data: info } = response;

    yield put(getReviewSuccess(info));
  } catch (error) {
    yield put(getReviewFailure(error.message));
  }
}

export function* reviewSaga() {
  yield takeEvery('review/getReview', getReview);
}
