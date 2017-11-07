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

  // helpers
  occupied: boolean;
  empty: boolean;
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
    occupied?: boolean,
    empty?: boolean
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
    occupied?: boolean,
    empty?: boolean
  } = {}) {
    this.uuid = options.uuid ? options.uuid : UUID.UUID();

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

    this.updateSubzones();
  }

  getUpdatedCopy(options) {
    return new ScheduleContent(Object.assign({}, this, options));
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

  get exportable() {
    const obj = Object.assign({}, this);
    delete obj.empty;
    delete obj.uuid;
    delete obj.occupied;
    delete obj.subzones;
    return obj;
  }
}
