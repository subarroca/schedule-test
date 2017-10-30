export class ScheduleContent {
  period = 0;
  periodSpan = 1;
  day = 0;
  daySpan = 1;
  label: string;
  icon: string;
  highlight: boolean;

  constructor(options: {
    period?: number,
    periodSpan?: number,
    day?: number,
    daySpan?: number,
    label?: string,
    icon?: string,
    highlight?: boolean
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
    highlight?: boolean
  } = {}) {
    this.period = options.period || this.period;
    this.periodSpan = options.periodSpan || this.periodSpan;
    this.day = options.day || this.day;
    this.daySpan = options.daySpan || this.daySpan;
    this.label = options.label || this.label;
    this.icon = options.icon || this.icon;
    this.highlight = options.highlight || this.highlight;
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
