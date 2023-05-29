import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Breadcrumbs } from '../../components/breadcrumbs';
import { Calendar } from '../../components/calendar';
import { ErrorWindow } from '../../components/error-window';
import { Loader } from '../../components/loader';
import { ReviewAllert } from '../../components/review-allert';
import { Review } from '../../components/review-component';
import { SuccessWindow } from '../../components/success-booking';
import { getBook } from '../../features/book';
import { getBookingFailure, getBookingSuccess } from '../../features/booking';
import { getDeleteFailure, getDeleteSuccess } from '../../features/delete';
import { getEditReviewFailure, getEditReviewSuccess } from '../../features/editreview';
import { getRebookingFailure, getRebookingSuccess } from '../../features/rebooking';
import { getReviewFailure, getReviewSuccess } from '../../features/review';
import bookImageNo from '../../img/book-image/image-no-image-book.png';
import { ReactComponent as ReviewChevronDown } from '../../img/icon/chevron-for-review-down.svg';
import { ReactComponent as ReviewChevronUp } from '../../img/icon/chevron-for-review-up.svg';
import { ReactComponent as EmptyStar } from '../../img/icon/Icon_star_empty.svg';
import { ReactComponent as FullStar } from '../../img/icon/Icon_star_full.svg';
import revievIcon from '../../img/icon/Review-icon.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getBookingState,
  getBookState,
  getDeleteState,
  getEditReviewState,
  getRebookingState,
  getReviewState,
} from '../../redux/selectors';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './book-page.css';

// eslint-disable-next-line complexity
export const BookPage = () => {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const [visibleReviev, setVisibleReviev] = useState(true);
  const [visibleRevievWindow, setVisibleRevievWindow] = useState(false);
  const [disabledReviewButton, setDisabledReviewButton] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [showWindowBooking, setShowWindowBooking] = useState(false);
  const [showWarningWindowBooking, setShowWarningWindowBooking] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const book = useAppSelector(getBookState);
  const review = useAppSelector(getReviewState);
  const editReview = useAppSelector(getEditReviewState);
  const booking = useAppSelector(getBookingState);
  const rebooking = useAppSelector(getRebookingState);
  const deleteBooking = useAppSelector(getDeleteState);
  const [oneBookId, setOneBookId] = useState(null);
  const [custonerId, setCustomerId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [selectedDate, setSelectedDay] = useState();

  const showBooking = () => {
    setShowWindowBooking(false);
  };
  const showBookingWarning = () => {
    setShowWarningWindowBooking(false);
  };
  const show = () => {
    setShowWindow(false);
  };
  const showWarning = () => {
    setShowWarningWindow(false);
  };

  useEffect(() => {
    if (showWindowBooking) {
      setTimeout(showBooking, 4000);
    }
    if (showWarningWindowBooking) {
      setTimeout(showBookingWarning, 4000);
    }
  }, [showWarningWindowBooking, showWindowBooking]);

  useEffect(() => {
    if (booking.content || rebooking.content || deleteBooking.content) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getBookingSuccess(null));
      dispatch(getRebookingSuccess(null));
      dispatch(getDeleteSuccess(null));
      setShowWindowBooking(true);
    }
  }, [bookId, booking.content, deleteBooking.content, dispatch, rebooking.content]);

  useEffect(() => {
    if (booking.error || rebooking.error || deleteBooking.error) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getBookingFailure(null));
      dispatch(getRebookingFailure(null));
      dispatch(getDeleteFailure(null));
      setShowWarningWindowBooking(true);
    }
  }, [bookId, booking.error, deleteBooking.error, dispatch, rebooking.error]);

  useEffect(() => {
    for (let i = 0; i < book?.content?.comments?.length; i++) {
      if (book?.content?.comments[i].user.commentUserId === Number(localStorage.getItem('user'))) {
        setDisabledReviewButton(true);
      }
    }
  }, [book?.content?.comments]);

  useEffect(() => {
    if (review.content) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getReviewSuccess(null));
      setShowWindow(true);
      setTimeout(show, 4000);
    }
    if (review.error) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getReviewFailure(null));
      setShowWarningWindow(true);
      setTimeout(showWarning, 4000);
    }
  }, [bookId, dispatch, review.content, review.error]);

  useEffect(() => {
    if (editReview.content) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getEditReviewSuccess(null));
      setShowWindow(true);
      setTimeout(show, 4000);
    }
    if (editReview.error) {
      dispatch(getBook(`/api/books/${bookId}`));
      dispatch(getEditReviewFailure(null));
      setShowWarningWindow(true);
      setTimeout(showWarning, 4000);
    }
  }, [bookId, dispatch, editReview.content, editReview.error]);

  useEffect(() => {
    dispatch(getBook(`/api/books/${bookId}`));
    setDisabledReviewButton(false);
  }, [dispatch, bookId]);

  return (
    <div>
      {oneBookId && (
        <Calendar
          bookId={oneBookId}
          setBookId={setOneBookId}
          selectedDate={selectedDate}
          selectDate={(date) => setSelectedDay(date)}
          custonerId={custonerId}
          setCustomerId={setCustomerId}
          bookingId={bookingId}
          setBookingId={setBookingId}
        />
      )}

      {showWindowBooking && (
        <div className='allert-in-book'>
          <SuccessWindow info={true} open={setShowWindowBooking} />
        </div>
      )}
      {showWarningWindowBooking && (
        <div className='allert-in-book'>
          <SuccessWindow info={false} open={setShowWarningWindowBooking} />
        </div>
      )}

      {showWindow && (
        <div className='allert-in-book'>
          <ReviewAllert open={setShowWindow} info={true} />
        </div>
      )}
      {showWarningWindow && (
        <div className='allert-in-book'>
          <ReviewAllert open={setShowWarningWindow} info={false} />
        </div>
      )}
      {visibleRevievWindow && <Review id={book.content?.id} setVisibleRevievWindow={setVisibleRevievWindow} />}
      {book.error && (
        <div className='error-in-book' data-test-id='error'>
          <ErrorWindow />
        </div>
      )}
      <div className={book.isLoading === 'pending' ? 'loader-in-book' : ''}>
        {book.isLoading === 'pending' && (
          <div data-test-id='loader'>
            <Loader />
          </div>
        )}
      </div>
      {book.content && (
        <div className='book-page'>
          <Breadcrumbs />
          <div className='general-book-information'>
            <div className='general-book-image-section'>
              <div className='swiper-section'>
                <Swiper
                  data-test-id='slide-big'
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': ' #363636',
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  navigation={true}
                  initialSlide={2}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[Navigation, Thumbs, Pagination]}
                  className='mySwiper2'
                >
                  {book.content?.images?.length ? (
                    <div>
                      {book.content?.images.map((item) => (
                        <SwiperSlide>
                          <img src={item.url} alt='no' />
                        </SwiperSlide>
                      ))}
                    </div>
                  ) : (
                    <SwiperSlide>
                      <img src={bookImageNo} alt='no' />
                    </SwiperSlide>
                  )}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={27.5}
                  slidesPerView={5}
                  loop={true}
                  scrollbar={{
                    draggable: true,
                  }}
                  watchSlidesProgress={true}
                  modules={[Navigation, Thumbs, Scrollbar]}
                  className={book.content?.images?.length > 1 ? 'mySwiper' : 'for-the-best-tests'}
                >
                  {book.content?.images?.length ? (
                    <div>
                      {book.content?.images.map((item) => (
                        <SwiperSlide data-test-id='slide-mini'>
                          <img src={item.url} alt='no' />
                        </SwiperSlide>
                      ))}
                    </div>
                  ) : (
                    <SwiperSlide data-test-id='slide-mini'>
                      <img src={bookImageNo} alt='no' />
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </div>

            <div className='box2'>
              <div className='name-book'>
                <h3 data-test-id='book-title'>{book.content?.title}</h3>
                {!!book.content?.authors?.length && (
                  <h5>
                    {book.content?.authors[0]}, {book.content?.issueYear}
                  </h5>
                )}
              </div>
              <button
                data-test-id='booking-button'
                onClick={() => {
                  setOneBookId(book.content.id);
                  setCustomerId(book.content.booking?.dateOrder);
                  setBookingId(book.content.booking?.id);
                }}
                disabled={
                  book.content.booking
                    ? book.content.booking.customerId === Number(localStorage.getItem('user'))
                      ? false
                      : true
                    : false || book.content.delivery
                    ? true
                    : false
                }
                className={
                  !book.content.booking && !book.content.delivery ? 'book-page-button' : 'book-page-button-booked'
                }
                type='button'
              >
                {!book.content.delivery && (!book.content.booking ? 'ЗАБРОНИРОВАТЬ' : 'ЗАБРОНИРОВАНА')}
                {book.content.delivery &&
                  `ЗАНЯТА ДО ${book.content.delivery.dateHandedTo.substr(
                    8,
                    2
                  )}.${book.content.delivery.dateHandedTo.substr(5, 2)}`}
              </button>
            </div>
            <div className='box3'>
              <h5>О книге</h5>
              {book.content.description}
            </div>
          </div>
          <div>
            <div className='rating'>
              <h5>Рейтинг</h5>
              <div>
                {book.content?.rating !== null ? (
                  <div>
                    {[...Array(Math.floor(book.content.rating))].map(() => (
                      <FullStar />
                    ))}
                    {[...Array(Math.ceil(5 - book.content.rating))].map(() => (
                      <EmptyStar />
                    ))}
                  </div>
                ) : (
                  'Еще нет оценок'
                )}
                <p>{book.content?.rating}</p>
              </div>
            </div>
            <div className='about-book'>
              <h5>Подробная информация</h5>
              <div>
                <div className='about-book-left-side'>
                  <ul className='about-book-list-title'>
                    <li>Издательство</li>
                    <li>Год издания</li>
                    <li>Страниц</li>
                    <li>Переплет</li>
                    <li>Формат</li>
                  </ul>
                  <ul className='about-book-list-info'>
                    <li>{book.content.bublish}</li>
                    <li>{book.content.issueYear}</li>
                    <li>{book.content.pages}</li>
                    <li>{book.content.cover}</li>
                    <li>{book.content.format}</li>
                  </ul>
                </div>
                <div className='about-book-right-side'>
                  <ul className='about-book-list-title'>
                    <li>Жанр</li>
                    <li>Вес</li>
                    <li>ISBN</li>
                    <li>Изготовитель</li>
                  </ul>
                  <ul className='about-book-list-info'>
                    <li>{book.content.categories}</li>
                    <li>{book.content.weight}г</li>
                    <li>{book.content.ISBN}</li>
                    <li>{book.content.producer}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='reviews'>
              <h5>
                Отзывы<span>{book.content.comments ? book.content?.comments?.length : '0'}</span>
                {book.content.comments && (
                  <button
                    data-test-id='button-hide-reviews'
                    type='button'
                    onClick={() => {
                      setVisibleReviev(!visibleReviev);
                    }}
                  >
                    {visibleReviev ? <ReviewChevronUp /> : <ReviewChevronDown />}
                  </button>
                )}
              </h5>

              <div data-test-id='reviews' className={visibleReviev ? '' : 'for-the-best-tests'}>
                {book.content?.comments &&
                  Object.values(book.content?.comments)
                    ?.reverse()
                    .map((item) => (
                      <div data-test-id='comment-wrapper' className='review'>
                        <div>
                          <img src={item.user.avatarUrl ? item.user.avatarUrl : revievIcon} alt='no' />
                          <div>
                            <p data-test-id='comment-author'>
                              {item.user.firstName} {item.user.lastName}
                            </p>
                            <p data-test-id='comment-date'>
                              {new Date(item.createdAt).toLocaleString('ru', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div data-test-id='rating' className='review-stars'>
                          {book.content?.rating !== null ? (
                            <div>
                              {[...Array(Math.round(item.rating))].map(() => (
                                <FullStar data-test-id='star-active' />
                              ))}
                              {[...Array(Math.round(5 - item.rating))].map(() => (
                                <EmptyStar />
                              ))}
                            </div>
                          ) : (
                            'Еще нет оценок'
                          )}
                        </div>
                        <span data-test-id='comment-text'>{item.text}</span>
                      </div>
                    ))}
              </div>
              <button
                className={disabledReviewButton ? 'radind-grade-button-white' : 'radind-grade-button'}
                onClick={() => {
                  setVisibleRevievWindow(true);
                }}
                data-test-id='button-rate-book'
                type='button'
              >
                {disabledReviewButton ? 'Изменить оценку' : 'Оценить книгу'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
