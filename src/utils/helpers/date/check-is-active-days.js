import { checkIsOpenDate } from './check-is-open-date';

export const checkIsActiveDays = (dateName, date) => {
  const today = new Date();
  const dayNumber = today.getDay();

  return checkIsOpenDate(dayNumber, today, date);
};
