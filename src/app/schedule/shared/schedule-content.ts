import { UUID } from 'angular2-uuid';

export class ScheduleContent {
  uuid: string;
  period = 0;
  periodSpan = 1;
  day = 0;
  daySpan = 1;
  label: string;
  icon: string;
  highlight: boolean;
  hasIncludedActivity: boolean;
  hasPremiumActivity: boolean;

  // helpers
  occupied: boolean;
  subzones: any[];

  constructor(options: {
    uuid?: string,
    period?: number,
    periodSpan?: number,
    day?: number,
    daySpan?: number,
    label?: string,
    icon?: string,
    highlight?: boolean,
    hasIncludedActivity?: boolean,
    hasPremiumActivity?: boolean,
    occupied?: boolean
  } = {}) {
    this.update(options);
  }

  // Don't do direct edition. Make it all go through parent
  update(options: {
    uuid?: string,
    period?: number,
    periodSpan?: number,
    day?: number,
    daySpan?: number,
    label?: string,
    icon?: string,
    highlight?: boolean,
    hasIncludedActivity?: boolean,
    hasPremiumActivity?: boolean,
    occupied?: boolean
  } = {}) {
    this.uuid = options.uuid ? options.uuid : UUID.UUID();

    this.period = (options.period !== undefined) ? options.period : this.period;
    this.periodSpan = options.periodSpan || this.periodSpan || 1;
    this.day = (options.day !== undefined) ? options.day : this.day;
    this.daySpan = options.daySpan || this.daySpan || 1;
    this.label = options.label || this.label;
    this.icon = options.icon || this.icon;
    this.highlight = options.highlight || this.highlight;
    this.hasIncludedActivity = options.hasIncludedActivity !== undefined ? options.hasIncludedActivity : this.hasIncludedActivity;
    this.hasPremiumActivity = options.hasPremiumActivity !== undefined ? options.hasPremiumActivity : this.hasPremiumActivity;

    this.occupied = !!(options.occupied !== undefined ? options.occupied : this.occupied);

    this.updateSubzones();
  }

  get empty() {
    return !(this.label && this.label.length || this.hasIncludedActivity || this.hasPremiumActivity);
  }

  getUpdatedCopy(options) {
    return new ScheduleContent(Object.assign({}, this, options));
  }

  // check if other's start is in this' range or viceversa. then overlap
  // check if both period and day overlap
  overlaps(other: ScheduleContent) {
    const dayOverlap = (this.day >= other.day && this.day <= (other.day + other.daySpan - 1)
      || other.day >= this.day && other.day <= (this.day + this.daySpan - 1));

    const periodOverlap = (this.period >= other.period && this.period <= (other.period + other.periodSpan - 1)
      || other.period >= this.period && other.period <= (this.period + this.periodSpan - 1));

    return dayOverlap && periodOverlap;
  }

  get hasSubzones() {
    return this.daySpan > 1 || this.periodSpan > 1;
  }

  private updateSubzones() {
    const periods = Array.from(Array(this.periodSpan))
      .map((pv, p) => Array.from(Array(this.daySpan))
        .map((dv, d) => ({
          period: this.period + p - 1,
          day: this.day + d - 1
        }))
      );

    this.subzones = [].concat(...periods);
  }

  get formatedLabel() {
    return this.label && this.label.replace(/\n/g, '<br/>');
  }

  getLimitedDaySpan(numDays) {
    return Math.min(this.daySpan, numDays - this.day);
  }
  getLimitedPeriodSpan(numPeriods) {
    return Math.min(this.periodSpan, numPeriods - this.period);
  }

  get exportable() {
    const obj = Object.assign({}, this);
    delete obj.uuid;
    delete obj.occupied;
    delete obj.subzones;
    return obj;
  }
}
