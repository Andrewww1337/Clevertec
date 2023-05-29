import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getDelete, getDeleteFailure, getDeleteSuccess } from '../../features/delete';
import { getUser } from '../../features/user';
import smallBookNoImage from '../../img/book-image/small-image-no.png';
import { ReactComponent as EmptyStar } from '../../img/icon/Icon_star_empty.svg';
import { ReactComponent as FullStar } from '../../img/icon/Icon_star_full.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getDeleteState } from '../../redux/selectors';

import './book-card-profile.css';

// eslint-disable-next-line complexity
export const BookCardProfile = ({
  title,
  onHands,
  authors,
  rating,
  image,
  id,
  issueYear,
  isOpen,
  isOpenError,
  bookingId,
  dateHandedTo,
}) => {
  const dispatch = useAppDispatch();
  const deleteBooking = useAppSelector(getDeleteState);

  const onClickButton = () => {
    dispatch(getDelete({ bookingId }));
  };

  useEffect(() => {
    if (deleteBooking.error) {
      dispatch(getUser());
      isOpenError(true);
      dispatch(getDeleteFailure(null));
    } else if (deleteBooking.content) {
      dispatch(getUser());
      isOpen(true);
      dispatch(getDeleteSuccess(null));
    }
  }, [deleteBooking.content, deleteBooking.error, dispatch, isOpen, isOpenError]);

  return (
    <Link className='link' data-test-id='card' to={`/books/all/${id}`}>
      <div className='book-card-horizontal-profile'>
        <div className='book-card-in-profile'>
          <div className='image-block-horizontal'>
            {image && <img src={image} alt='no' className='book-image-horizontal' />}
            {!image && <img src={smallBookNoImage} alt='no' className='book-image-horizontal' />}
          </div>

          <div className='book-card-info-section-horizontal-profile'>
            <div className='book-card-about'>
              <p className='book-card-title-horizontal'>{title}</p>
              <p className='book-card-author-horizontal'>
                {authors[0]}, {issueYear}
              </p>
            </div>

            <div className='book-card-button-section-horizontal'>
              <div className='stars-panel'>
                {rating ? (
                  <div>
                    {[...Array(Math.round(rating))].map(() => (
                      <FullStar />
                    ))}
                    {[...Array(Math.floor(5 - rating))].map(() => (
                      <EmptyStar />
                    ))}
                  </div>
                ) : (
                  'Еще нет оценок'
                )}
              </div>
              {!onHands && (
                <button
                  data-test-id='cancel-booking-button'
                  onClick={(event) => {
                    event.preventDefault();
                    onClickButton();
                  }}
                  disabled={false}
                  className='book-card-button-horizontal-profile'
                  type='button'
                >
                  ОТМЕНИТЬ БРОНЬ
                </button>
              )}
              {onHands && (
                <p className='return-book'>
                  {' '}
                  {onHands && `Возврат ${dateHandedTo?.substr(8, 2)}.${dateHandedTo?.substr(5, 2)}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
