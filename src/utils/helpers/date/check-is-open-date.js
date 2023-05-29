export const checkIsOpenDate = (dayNumber, date1, date2) =>
  (dayNumber !== 0 &&
    dayNumber !== 6 &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()) ||
  (dayNumber !== 6 &&
    dayNumber !== 5 &&
    date1.getDate() === date2.getDate() - 1 &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()) ||
  (dayNumber !== 0 &&
    dayNumber === 6 &&
    date1.getDate() === date2.getDate() - 2 &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()) ||
  (dayNumber === 5 &&
    date1.getDate() === date2.getDate() - 3 &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear());
