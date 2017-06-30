export class DayPeriod {

  static readonly periods: string[] = [
    'Morning',
    'Afternoon',
    'Evening'
  ];

  static getSortedPeriods(firstPeriod, numPeriods) {
    return Array.from(Array(DayPeriod.periods.length * 2).keys())
      .slice(firstPeriod, firstPeriod + numPeriods)
      .map(day => {
        day = day % DayPeriod.periods.length;

        return {
          key: day,
          value: DayPeriod.periods[day]
        }
      });

  }
}
