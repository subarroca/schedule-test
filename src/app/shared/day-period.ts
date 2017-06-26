export class DayPeriod {

  static readonly periods: string[] = [
    'Morning',
    'Afternoon',
    'Evening'
  ];

  static getSortedPeriods(firstPeriod, numPeriods) {
    return DayPeriod.periods.slice(firstPeriod, firstPeriod + numPeriods);
  }
}
