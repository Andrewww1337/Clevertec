import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../features/auth';
import { avatarReducer } from '../features/avatar';
import { bookReducer } from '../features/book';
import { bookingReducer } from '../features/booking';
import { categoriesReducer } from '../features/categories';
import { deleteReducer } from '../features/delete';
import { editReducer } from '../features/edit';
import { editReviewReducer } from '../features/editreview';
import { forgotReducer } from '../features/forgot';
import { postsReducer } from '../features/posts';
import { rebookingReducer } from '../features/rebooking';
import { recoveryReducer } from '../features/recovery';
import { registrationReducer } from '../features/registration';
import { reviewReducer } from '../features/review';
import { userReducer } from '../features/user';
import { authSaga } from '../sagas/auth-sagas';
import { avatarSaga } from '../sagas/avatar-sagas';
import { bookSaga } from '../sagas/book-sagas';
import { bookingSaga } from '../sagas/booking-sagas';
import { categoriesSaga } from '../sagas/categories-sagas';
import { deleteSaga } from '../sagas/delete-sagas';
import { editSaga } from '../sagas/edit-sagas';
import { editReviewSaga } from '../sagas/editreview-sagas';
import { forgotSaga } from '../sagas/forgot-sagas';
import { postSaga } from '../sagas/post-sagas';
import { rebookingSaga } from '../sagas/rebooking-sagas';
import { recoverySaga } from '../sagas/recovery-sagas';
import { registrationSaga } from '../sagas/registration-sagas';
import { reviewSaga } from '../sagas/review-sagas';
import { userSaga } from '../sagas/user-sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    categories: categoriesReducer,
    book: bookReducer,
    auth: authReducer,
    registration: registrationReducer,
    forgot: forgotReducer,
    recovery: recoveryReducer,
    booking: bookingReducer,
    rebooking: rebookingReducer,
    delete: deleteReducer,
    review: reviewReducer,
    user: userReducer,
    avatar: avatarReducer,
    edit: editReducer,
    editReview: editReviewReducer,
  },
  middleware(getDefauitMiddleware) {
    return getDefauitMiddleware().concat(sagaMiddleware);
  },
});
sagaMiddleware.run(postSaga);
sagaMiddleware.run(registrationSaga);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(forgotSaga);
sagaMiddleware.run(bookSaga);
sagaMiddleware.run(recoverySaga);
sagaMiddleware.run(bookingSaga);
sagaMiddleware.run(rebookingSaga);
sagaMiddleware.run(deleteSaga);
sagaMiddleware.run(reviewSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(avatarSaga);
sagaMiddleware.run(editSaga);
sagaMiddleware.run(editReviewSaga);
