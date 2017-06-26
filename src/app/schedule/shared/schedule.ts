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
    this.firstDay = options.firstDay;
    this.numDays = options.numDays;
    this.firstPeriod = options.firstPeriod;
    this.numPeriods = options.numPeriods;
    this.comment = options.comment;
  }
}
