import { ReactComponent as CheckCircle } from '../../img/icon/CheckCircle.svg';
import { ReactComponent as Cross } from '../../img/icon/error-cross.svg';
import { ReactComponent as WarningCircle } from '../../img/icon/WarningCircle.svg';

import './success-booking.css';

export const SuccessWindow = ({ deleteBooking, rebooking, open, bookList, info }) => (
  <div
    data-test-id='error'
    className={info ? `success-window${bookList ? '-book-list' : ''}` : `error-window${bookList ? '-book-list' : ''}`}
  >
    <div className='warning-title'>
      {info ? <CheckCircle /> : <WarningCircle />}

      {info ? (
        deleteBooking ? (
          <p>Бронирование книги успешно отменено!</p>
        ) : rebooking ? (
          <p>Изменения успешно сохранены!</p>
        ) : (
          <p>Книга забронирована. Подробности можно посмотреть на странице Профиль</p>
        )
      ) : deleteBooking ? (
        <p>Не удалось снять бронирование книги. Попробуйте позже!</p>
      ) : rebooking ? (
        <p>Изменения не были сохранены. Попробуйте позже!</p>
      ) : (
        <p>Что-то пошло не так, книга не забронирована. Попробуйте позже!</p>
      )}
    </div>
    <button
      data-test-id='alert-close'
      className='botton-success-boking'
      onClick={() => {
        open(false);
      }}
      type='button'
    >
      <Cross />
    </button>
  </div>
);
