import { DayPeriod } from 'app/shared/day-period';
import { Weekday } from 'app/shared/weekday';


// TODO: control that values are within range

export class Schedule {
  firstDay: number;
  numDays: number;
  firstPeriod: number;
  numPeriods: number;
  comment: string;


  constructor(options: {
    firstDay?: number,
    numDays?: number,
    firstPeriod?: number,
    numPeriods?: number,
    comment?: string,
  } = {}) {
    this.firstDay = options.firstDay || 0;
    this.numDays = options.numDays || Weekday.days.length;
    this.firstPeriod = options.firstPeriod || 0;
    this.numPeriods = options.numPeriods || DayPeriod.periods.length;
    this.comment = options.comment;
  }


  get sortedDays() {
    return Weekday.getSortedDays(this.firstDay).slice(0, this.numDays);
  }

  get sortedPeriods() {
    return DayPeriod.getSortedPeriods(this.firstPeriod, this.numPeriods);
  }


  // GETTERS FOR SELECT OPTIONS
  // This could be static but we might want to adapt the
  // number of periods available based on first period, for instance
  get days() {
    return Weekday.days;
  }

  get periods() {
    return DayPeriod.periods;
  }

  get numDaysOptions() {
    return Array.from(Array(this.days.length).keys());
  }

  get numPeriodsOptions() {
    return Array.from(Array(this.periods.length).keys());
  }
}
