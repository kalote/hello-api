import moment from 'moment';

export const daysUntil = (date: string): number => {
  const birthday = moment(date);
  const today = moment().format('YYYY-MM-DD');

  const age = moment(today).diff(birthday, 'years');

  let nextBirthday = moment(birthday).add(age, 'years');

  if (nextBirthday.isSame(today)) {
    return 0;
  } else {
    nextBirthday = moment(birthday).add(age + 1, 'years');
    return nextBirthday.diff(today, 'days');
  }
};
