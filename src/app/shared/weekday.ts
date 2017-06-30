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
    return Array.from(Array(Weekday.days.length * 2).keys())
      .slice(firstDay, firstDay + Weekday.days.length)
      .map(day => {
        day = day % Weekday.days.length;

        return {
          key: day,
          value: Weekday.days[day]
        }
      });

  }
}
