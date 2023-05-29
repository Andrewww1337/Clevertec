import React, { useEffect } from 'react';

import { getBooking } from '../../features/booking';
import { getDelete } from '../../features/delete';
import { getRebooking } from '../../features/rebooking';
import { ReactComponent as ArrowDrop } from '../../img/icon/arrow_drop_down.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getBookingState, getDeleteState, getRebookingState } from '../../redux/selectors';
import { checkDateIsEqual, checkIsActiveDays, checkIsToday } from '../../utils/helpers/date';
import { Loader } from '../loader';

import { useCalendar } from './hooks/use-calendar';

import './calendar.css';

// eslint-disable-next-line complexity
export const Calendar = ({
  bookId,
  setBookId,
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
  custonerId,
  setCustomerId,
  bookingId,
  setBookingId,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });
  const dispatch = useAppDispatch();
  const booking = useAppSelector(getBookingState);
  const rebooking = useAppSelector(getRebookingState);
  const deleteBooking = useAppSelector(getDeleteState);

  const bookingDelete = () => {
    dispatch(getDelete({ bookingId }));
  };
  const bookingBook = () => {
    if (custonerId) {
      dispatch(
        getRebooking({
          bookingId,
          order: true,
          dateBooking: new Date(String(date).replace('00:00:00', '03:00:00')).toISOString(),
          userId: Number(localStorage.getItem('user')),
          bookId: Number(bookId),
        })
      );
    }
    if (!custonerId) {
      dispatch(
        getBooking({
          userId: Number(localStorage.getItem('user')),
          bookId: Number(bookId),
          dateBooking: new Date(String(date).replace('00:00:00', '03:00:00')).toISOString(),
          order: true,
        })
      );
    }
  };

  useEffect(() => {
    if (custonerId) {
      selectDate(new Date(custonerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (booking.content !== null || rebooking.content !== null || deleteBooking.content !== null) {
      setCustomerId(null);
      setBookId(null);
      selectDate(null);
    }
  }, [booking.content, deleteBooking.content, dispatch, rebooking.content, selectDate, setBookId, setCustomerId]);

  useEffect(() => {
    if (booking.error !== null || rebooking.error !== null || deleteBooking.error !== null) {
      setCustomerId(null);
      setBookId(null);
      selectDate(null);
    }
  }, [booking.content, booking.error, deleteBooking.error, rebooking.error, selectDate, setBookId, setCustomerId]);

  return (
    <div
      data-test-id='modal-outer'
      aria-hidden={true}
      onClick={(e) => {
        e.stopPropagation();
        setBookId(null);
        selectDate(null);
        setCustomerId(null);
        setBookingId(null);
      }}
      className='calendar-conteiner'
    >
      <div
        className={
          rebooking.isLoading === 'pending' || booking.isLoading === 'pending' || deleteBooking.isLoading === 'pending'
            ? 'loader-in-calendar'
            : 'loader-disabled'
        }
      >
        <div data-test-id='loader'>
          <Loader />
        </div>
      </div>
      <div
        data-test-id='booking-modal'
        aria-hidden={true}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          custonerId
            ? `calendar-form-re-booking${state.calendarDays.length > 35 ? '-big' : ''}`
            : `calendar-form${state.calendarDays.length > 35 ? '-big' : ''}`
        }
      >
        <button
          data-test-id='modal-close-button'
          type='button'
          onClick={() => {
            setBookId(null);
            selectDate(null);
            setCustomerId(null);
            setBookingId(null);
          }}
          className='cross-calendar'
          aria-hidden='true'
        />
        {!custonerId && (
          <h3 data-test-id='modal-title' className='calendar-title'>
            Выбор даты бронирования
          </h3>
        )}
        {custonerId && (
          <h3 data-test-id='modal-title' className='calendar-title'>
            Изменение даты бронирования
          </h3>
        )}
        <div data-test-id='calendar' className={state.calendarDays.length < 36 ? 'calendar' : 'calendar-big'}>
          <div className='calendar-header'>
            {state.mode === 'days' && (
              <div data-test-id='month-select' aria-hidden={true} onClick={() => functions.setMode('monthes')}>
                {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                <ArrowDrop className='arrow-drop' />
              </div>
            )}

            {state.mode === 'years' && (
              <div>
                {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
              </div>
            )}
            <div className={state.mode === 'days' ? 'arrows-block' : 'arrow-block-none'}>
              <div
                data-test-id='button-prev-month'
                aria-hidden={true}
                className='calendar-header-arrow-left'
                onClick={() => functions.onClickArrow('left')}
              />
              <div
                data-test-id='button-next-month'
                aria-hidden={true}
                className='calendar-header-arrow-right'
                onClick={() => functions.onClickArrow('right')}
              />
            </div>
          </div>
          <div className='calendar-body'>
            {state.mode === 'days' && (
              <React.Fragment>
                <div className='calendar-week-names'>
                  {state.weekDaysNames.map((weekDaysName) => (
                    <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                  ))}
                </div>
                <div className='calendar-days'>
                  {state.calendarDays.map((day) => {
                    const isToday = checkIsToday(day.date);
                    const dayOff = day.dayShort === 'сб' || day.dayShort === 'вс';
                    const isSelectedDay = checkDateIsEqual(day.date, date);
                    const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                    const activeDays = checkIsActiveDays(day.dayShort, day.date);

                    return (
                      <div
                        data-test-id='day-button'
                        key={`${day.dayNumber}-${day.monthIndex}`}
                        aria-hidden={true}
                        onClick={() => {
                          if (activeDays) {
                            functions.setSelectedDay(day);
                            selectDate(day.date);
                          }
                        }}
                        className={`calendar-day 
                        ${isToday ? 'calendar-today-item ' : ''} 
                        ${dayOff ? 'calendar-day-off-item ' : ''}${activeDays ? 'calendar-day-active ' : ''}
                        ${isSelectedDay ? 'calendar-selected-item ' : ''}${
                          isAdditionalDay ? 'calendar-additional-day ' : ''
                        }`}
                      >
                        {day.dayNumber}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            )}

            {state.mode === 'monthes' && (
              <div className='calendar-pick-items-container'>
                {state.monthesNames.map((monthesName) => {
                  const isCurrentMonth =
                    new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
                  const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                  return (
                    <div
                      key={monthesName.month}
                      aria-hidden={true}
                      onClick={() => {
                        functions.setSelectedMonthByIndex(monthesName.monthIndex);
                        functions.setMode('days');
                      }}
                      className={[
                        'calendar-pick-item',
                        isSelectedMonth ? 'calendar-selected-item' : '',
                        isCurrentMonth ? 'calendar-today-item' : '',
                      ].join(' ')}
                    >
                      {monthesName.monthShort}
                    </div>
                  );
                })}
              </div>
            )}

            {state.mode === 'years' && (
              <div className='calendar-pick-items-container'>
                <div className='calendar-unchoosable-year'>{state.selectedYearsInterval[0] - 1}</div>
                {state.selectedYearsInterval.map((year) => {
                  const isCurrentYear = new Date().getFullYear() === year;
                  const isSelectedYear = year === state.selectedYear;

                  return (
                    <div
                      key={year}
                      aria-hidden={true}
                      onClick={() => {
                        functions.setSelectedYear(year);
                        functions.setMode('monthes');
                      }}
                      className={[
                        'calendar-pick-item',
                        isCurrentYear ? 'calendar-today-item' : '',
                        isSelectedYear ? 'calendar-selected-item' : '',
                      ].join(' ')}
                    >
                      {year}
                    </div>
                  );
                })}
                <div className='calendar-unchoosable-year'>
                  {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          data-test-id='booking-button'
          disabled={
            String(date) === String(new Date(custonerId)) ||
            !date ||
            (String(date).includes('00:00:00') &&
              String(date).replace('00:00:00', '03:00:00') === String(new Date(custonerId)))
              ? true
              : false
          }
          onClick={() => bookingBook()}
          className={custonerId ? 'calendar-re-submit-button' : 'calendar-submit-button'}
          type='button'
        >
          ЗАБРОНИРОВАТЬ
        </button>
        {custonerId && (
          <button
            data-test-id='booking-cancel-button'
            onClick={() => bookingDelete()}
            className='calendar-cancell-button'
            type='button'
          >
            ОТМЕНИТЬ БРОНЬ
          </button>
        )}
      </div>
    </div>
  );
};
