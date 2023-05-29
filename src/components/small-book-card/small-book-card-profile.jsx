import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBook } from '../../features/book';
import { getDelete, getDeleteSuccess } from '../../features/delete';
import { getUser } from '../../features/user';
import smallBookNoImage from '../../img/book-image/small-image-no.png';
import { ReactComponent as EmptyStar } from '../../img/icon/Icon_star_empty.svg';
import { ReactComponent as FullStar } from '../../img/icon/Icon_star_full.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getDeleteState } from '../../redux/selectors';

import './small-book-card-profile.css';

// eslint-disable-next-line complexity
export const SmallBookCardProfile = ({
  title,
  authors,
  rating,
  image,
  id,
  isOpen,
  user,
  setVisibleRevievWindow,
  setBookReview,
}) => {
  const dispatch = useAppDispatch();
  const [disabledReviewButton, setDisabledReviewButton] = useState(false);
  const deleteBooking = useAppSelector(getDeleteState);

  useEffect(() => {
    for (let i = 0; i < user?.content?.comments?.length; i++) {
      if (user?.content?.comments[i].bookId === id) {
        setDisabledReviewButton(true);
      }
    }
  }, [id, user?.content?.comments]);

  useEffect(() => {
    if (deleteBooking.content) {
      dispatch(getUser());
      isOpen(true);
      dispatch(getDeleteSuccess(null));
    }
  }, [deleteBooking.content, dispatch, isOpen]);

  return (
    <Link className='link' data-test-id='history-slide' to={`/books/all/${id}`}>
      <div className='small-book-card-profile'>
        <div className='image-block'>
          {image && <img src={image} alt='no' className='book-image' />}
          {!image && <img src={smallBookNoImage} alt='no' className='book-image' />}

          <div className='small-stars-panel'>
            {rating ? (
              <div>
                {[...Array(Math.floor(rating))].map(() => (
                  <FullStar />
                ))}
                {[...Array(Math.ceil(5 - rating))].map(() => (
                  <EmptyStar />
                ))}
              </div>
            ) : (
              'Еще нет оценок'
            )}
          </div>
        </div>
        <p className='small-book-card-title'>{title}</p>
        <div className='book-card-info-section'>
          <div className='book-card-button-section'>
            <p className='small-book-card-author'>{authors[0]}</p>

            {!disabledReviewButton && (
              <button
                data-test-id='history-review-button'
                onClick={(event) => {
                  event.preventDefault();
                  setVisibleRevievWindow(true);
                  setBookReview(id);
                  dispatch(getBook(`/api/books/${id}`));
                }}
                disabled={disabledReviewButton}
                className='grade-button-card-profile'
                type='button'
              >
                ОСТАВИТЬ ОТЗЫВ
              </button>
            )}
            {disabledReviewButton && (
              <button
                data-test-id='history-review-button'
                onClick={(event) => {
                  event.preventDefault();
                  setVisibleRevievWindow(true);
                  setBookReview(id);
                  dispatch(getBook(`/api/books/${id}`));
                }}
                className='regrade-button-card-profile'
                type='button'
              >
                ИЗМЕНИТЬ ОЦЕНКУ
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
