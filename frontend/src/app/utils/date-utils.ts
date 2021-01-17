export class DateUtils {
  static readonly DAY = 1000 * 60 * 60 * 24;
  static readonly WEEK = 7 * DateUtils.DAY;
  static readonly MONTH = 4 * DateUtils.WEEK;

  static getDateInputValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  static getTimeInputValue(date: Date): string {
    const parts = date.toLocaleTimeString().split(':');
    return `${parts[0]}:${parts[1]}`;
  }

  static setTimeValue(date: Date, value: string): void {
    const parts = value.split(':');
    date.setHours(+parts[0], +parts[1]);
  }
}

const DAY = 1000 * 60 * 60 * 24;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;

export const DATE_VALUES = {
  DAY,
  WEEK,
  MONTH,
};

export const DATE_OF_WEEK_OPTIONS = [
  {
    label: 'Понеділок',
    value: 1,
  },
  {
    label: 'Вівторок',
    value: 2,
  },
  {
    label: 'Середа',
    value: 3,
  },
  {
    label: 'Четверг',
    value: 4,
  },
  {
    label: 'П\'ятниця',
    value: 5,
  },
  {
    label: 'Субота',
    value: 6,
  },
  {
    label: 'Неділя',
    value: 0,
  },
];
