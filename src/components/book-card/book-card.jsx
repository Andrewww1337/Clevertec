import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import smallBookNoImage from '../../img/book-image/small-image-no.png';
import { ReactComponent as EmptyStar } from '../../img/icon/Icon_star_empty.svg';
import { ReactComponent as FullStar } from '../../img/icon/Icon_star_full.svg';

import './book-card.css';

// eslint-disable-next-line complexity
export const BookCard = ({
  title,
  authors,
  rating,
  image,
  id,
  category,
  activeRender,
  booking,
  delivery,
  searchArt,
  setBookId,
  setCustomerId,
  setBookingId,
}) => {
  const Hightlight = (props) => {
    const { filter, str } = props;

    if (!filter) return str;
    const regexp = new RegExp(filter.replace(/[^А-яЁё A-Za-z0-9!;:]/g, ''), 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
      return str.split(regexp).map((start, index, array) => {
        if (index < array.length - 1) {
          const rest = matchValue.shift();

          return (
            <React.Fragment>
              {start}
              <span data-test-id='highlight-matches' className='titleSelection'>
                {rest}
              </span>
            </React.Fragment>
          );
        }

        return start;
      });
    }

    return str;
  };

  const light = useCallback((str) => <Hightlight filter={searchArt} str={str} />, [searchArt]);

  return (
    <Link className='link' data-test-id='card' to={`/books/${category}/${id}`}>
      <div className={activeRender ? 'book-card' : 'book-card-horizontal'}>
        <div className={activeRender ? 'image-block' : 'image-block-horizontal'}>
          {image && <img src={image.url} alt='no' className={activeRender ? 'book-image' : 'book-image-horizontal'} />}
          {!image && (
            <img src={smallBookNoImage} alt='no' className={activeRender ? 'book-image' : 'book-image-horizontal'} />
          )}

          {activeRender && (
            <div className='stars-panel'>
              {rating !== null ? (
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
          )}
        </div>
        {activeRender && <p className='book-card-title'>{light(title)}</p>}
        <div className={activeRender ? 'book-card-info-section' : 'book-card-info-section-horizontal'}>
          {!activeRender && (
            <div className='book-card-about'>
              <p className='book-card-title-horizontal'>{light(title)}</p>
              <p className='book-card-author-horizontal'>{authors[0]}</p>
            </div>
          )}
          <div className={activeRender ? 'book-card-button-section' : 'book-card-button-section-horizontal'}>
            {activeRender && <p className='book-card-author'>{authors[0]}</p>}
            {!activeRender && (
              <div className='stars-panel'>
                {rating !== null ? (
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
            )}

            <button
              data-test-id='booking-button'
              onClick={(event) => {
                event.preventDefault();
                setBookId(id);
                setCustomerId(booking?.dateOrder);
                setBookingId(booking?.id);
              }}
              disabled={delivery || (booking && booking?.customerId !== Number(localStorage.getItem('user')))}
              className={
                activeRender
                  ? !booking && !delivery
                    ? 'book-card-button'
                    : 'book-card-button-booked'
                  : !booking && !delivery
                  ? 'book-card-button-horizontal'
                  : 'book-card-button-horizontal-booked'
              }
              type='button'
            >
              {!delivery && (!booking ? 'ЗАБРОНИРОВАТЬ' : 'ЗАБРОНИРОВАНА')}
              {delivery && `ЗАНЯТА ДО ${delivery?.dateHandedTo.substr(8, 2)}.${delivery.dateHandedTo.substr(5, 2)}`}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
