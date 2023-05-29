import { useEffect, useMemo, useState } from 'react';

import { getEditReview, getEditReviewFailure, getEditReviewSuccess } from '../../features/editreview';
import { getReview } from '../../features/review';
import { ReactComponent as EmptyStar } from '../../img/icon/Icon_star_empty.svg';
import { ReactComponent as FullStar } from '../../img/icon/Icon_star_full.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getEditReviewState, getReviewState, getUserState } from '../../redux/selectors';
import { Loader } from '../loader';

import './review.css';

export const Review = ({ id, setVisibleRevievWindow, setBookReview }) => {
  const user = useAppSelector(getUserState);
  const editReview = useAppSelector(getEditReviewState);
  const review = useAppSelector(getReviewState);

  const [grade, setGrade] = useState(1);
  const [message, setMessage] = useState('');
  const [oldMessage, setOldMessage] = useState('');
  const dispatch = useAppDispatch();

  const userComment = useMemo(() => user?.content?.comments?.filter((e) => e.bookId === id), [id, user]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const reviewReSubmit = () => {
    dispatch(
      getEditReview({
        user: String(localStorage.getItem('user')),
        rating: grade,
        text: message,
        book: String(id),
        commentId: userComment[0]?.id,
      })
    );
  };
  const reviewSubmit = () => {
    dispatch(
      getReview({
        user: String(localStorage.getItem('user')),
        rating: grade,
        text: message,
        book: String(id),
      })
    );
  };

  useEffect(() => {
    if (userComment?.length > 0) {
      setOldMessage(userComment[0]?.text);
      setGrade(userComment[0]?.rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (review?.content) {
      setVisibleRevievWindow(false);
      if (typeof setBookReview === 'function') {
        setBookReview(null);
      }
    }
    if (review?.error) {
      setVisibleRevievWindow(false);
      if (typeof setBookReview === 'function') {
        setBookReview(null);
      }
    }
  }, [review?.content, review?.error, setBookReview, setVisibleRevievWindow]);
  useEffect(() => {
    if (editReview?.content) {
      dispatch(getEditReviewSuccess(null));
      setVisibleRevievWindow(false);
      if (typeof setBookReview === 'function') {
        setBookReview(null);
      }
    }
    if (editReview?.error) {
      dispatch(getEditReviewFailure(null));
      setVisibleRevievWindow(false);

      if (typeof setBookReview === 'function') {
        setBookReview(null);
      }
    }
  }, [dispatch, editReview?.content, editReview?.error, setBookReview, setVisibleRevievWindow]);

  return (
    <div
      data-test-id='modal-outer'
      aria-hidden={true}
      onClick={() => {
        setVisibleRevievWindow(false);
        if (typeof setBookReview === 'function') {
          setBookReview(null);
        }
      }}
      className='review-conteiner'
    >
      <div
        className={
          review.isLoading === 'pending' || editReview.isLoading === 'pending'
            ? 'loader-in-calendar'
            : 'loader-disabled'
        }
      >
        <div data-test-id='loader'>
          <Loader />
        </div>
      </div>

      <div
        data-test-id='modal-rate-book'
        aria-hidden={true}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='review-window'
      >
        <button
          data-test-id='modal-close-button'
          type='button'
          onClick={() => {
            setVisibleRevievWindow(false);
            if (typeof setBookReview === 'function') {
              setBookReview(null);
            }
          }}
          className='cross-review'
          aria-hidden='true'
        />
        <h4 data-test-id='modal-title' className='review-title'>
          Оцените книгу
        </h4>
        <h5 className='review-grade-title'>Ваша оценка</h5>
        <div data-test-id='rating' className='star-conteiner'>
          <button
            data-test-id='star'
            onClick={() => {
              setGrade(1);
            }}
            className='star-button'
            type='button'
          >
            {grade > 0 && <FullStar data-test-id='star-active' className='star' />}
            {grade < 1 && <EmptyStar className='star' />}
          </button>
          <button
            data-test-id='star'
            onClick={() => {
              setGrade(2);
            }}
            className='star-button'
            type='button'
          >
            {grade > 1 && <FullStar data-test-id='star-active' className='star' />}
            {grade < 2 && <EmptyStar className='star' />}
          </button>
          <button
            data-test-id='star'
            onClick={() => {
              setGrade(3);
            }}
            className='star-button'
            type='button'
          >
            {grade > 2 && <FullStar data-test-id='star-active' className='star' />}
            {grade < 3 && <EmptyStar className='star' />}
          </button>
          <button
            data-test-id='star'
            onClick={() => {
              setGrade(4);
            }}
            className='star-button'
            type='button'
          >
            {grade > 3 && <FullStar data-test-id='star-active' className='star' />}
            {grade < 4 && <EmptyStar className='star' />}
          </button>
          <button
            data-test-id='star'
            onClick={() => {
              setGrade(5);
            }}
            className='star-button'
            type='button'
          >
            {grade === 5 && <FullStar data-test-id='star-active' className='star' />}
            {grade < 5 && <EmptyStar className='star' />}
          </button>
        </div>
        <textarea
          data-test-id='comment'
          onChange={handleMessageChange}
          placeholder='Оставить отзыв'
          className='text-area'
          rows='5'
          cols='33'
          defaultValue={oldMessage}
        />

        {!userComment?.length && (
          <button
            data-test-id='button-comment'
            onClick={() => {
              reviewSubmit();
            }}
            className='review-button'
            type='button'
          >
            ОЦЕНИТЬ
          </button>
        )}
        {!!userComment?.length && (
          <button
            data-test-id='button-comment'
            onClick={() => {
              reviewReSubmit();
            }}
            className='review-button'
            type='button'
          >
            ИЗМЕНИТЬ ОЦЕНКУ
          </button>
        )}
      </div>
    </div>
  );
};
