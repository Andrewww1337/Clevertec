import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getAvatarFailure, getAvatarSuccess } from '../features/avatar';

export function* getAvatar(action) {
  try {
    const response = yield call(() =>
      axios({
        method: 'put',
        url: `https://library-cleverland-2jfze.ondigitalocean.app/api/users/${localStorage.getItem('user')}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'multipart/form-data' },
        data: {
          avatar: action.payload,
        },
      })
    );

    const { data: info } = response;

    yield put(getAvatarSuccess(info));
  } catch (error) {
    yield put(getAvatarFailure(error.message));
  }
}

export function* avatarSaga() {
  yield takeEvery('avatar/getAvatar', getAvatar);
}
