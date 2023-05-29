import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsToday = (date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};
