export class ScheduleContent {
  period = 0;
  periodSpan = 1;
  day = 0;
  daySpan = 1;
  label: string;
  icon: string;
  highlight: boolean;

  occupied: boolean;
  empty: boolean;

  constructor(options: {
    period?: number,
    periodSpan?: number,
    day?: number,
    daySpan?: number,
    label?: string,
    icon?: string,
    highlight?: boolean,
    occupied?: boolean,
    empty?: boolean
  } = {}) {
    this.update(options);
  }

  update(options: {
    period?: number,
    periodSpan?: number,
    day?: number,
    daySpan?: number,
    label?: string,
    icon?: string,
    highlight?: boolean,
    occupied?: boolean,
    empty?: boolean
  } = {}) {
    this.period = (options.period !== undefined) ? options.period : this.period;
    this.periodSpan = options.periodSpan || this.periodSpan || 1;
    this.day = (options.day !== undefined) ? options.day : this.day;
    this.daySpan = options.daySpan || this.daySpan || 1;
    this.label = options.label || this.label;
    this.icon = options.icon || this.icon;
    this.highlight = options.highlight || this.highlight;

    if (this.label && this.label.length) {
      options.empty = false;
      options.occupied = true;
    }

    this.occupied = !!(options.occupied !== undefined ? options.occupied : this.occupied);
    this.empty = (options.empty !== undefined ? options.empty : this.empty) !== false;
  }

  overlaps(other: ScheduleContent) {
    // TODO: this should be reviewed
    if (this.day !== other.day) {
      return false;
    } else {
      if (this.periodSpan < other.period || other.periodSpan < this.period) {
        return false;
      } else {
        return true;
      }
    }
  }
}
