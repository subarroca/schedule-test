export class Weekday {
  static readonly days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  static getSortedDays(firstDay) {
    return Weekday.days.slice(firstDay).concat(Weekday.days.slice(0, firstDay));
  }
}
