import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getEditReviewFailure, getEditReviewSuccess } from '../features/editreview';

export function* getEditReview(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'put',
        url: `https://library-cleverland-2jfze.ondigitalocean.app/api/comments/${action.payload.commentId}`,
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

    yield put(getEditReviewSuccess(info));
  } catch (error) {
    yield put(getEditReviewFailure(error.message));
  }
}

export function* editReviewSaga() {
  yield takeEvery('editReview/getEditReview', getEditReview);
}
