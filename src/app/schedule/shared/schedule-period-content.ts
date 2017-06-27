export class SchedulePeriodContent {
  startPeriod: number;
  endPeriod: number;
  day: number;
  label: string;

  constructor(options: {
    startPeriod?: number,
    endPeriod?: number,
    day?: number,
    label?: string
  } = {}) {
    this.update(options);
  }

  update(options: {
    startPeriod?: number,
    endPeriod?: number,
    day?: number,
    label?: string
  } = {}) {
    this.startPeriod = options.startPeriod;
    this.endPeriod = options.endPeriod || options.startPeriod;
    this.day = options.day;
    this.label = options.label;
  }

  overlaps(other: SchedulePeriodContent) {
    // TODO: this should be reviewed
    if (this.day !== other.day) {
      return false;
    } else {
      if (this.endPeriod < other.startPeriod || other.endPeriod < this.startPeriod) {
        return false;
      } else {
        return true;
      }
    }
  }
}
