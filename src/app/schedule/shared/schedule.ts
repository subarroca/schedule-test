import {
  ScheduleContent,
} from 'app/schedule/shared/schedule-content';
import { Weekday } from 'app/shared/weekday';
import { SchedulePeriod } from 'app/schedule/shared/schedule-period';


// TODO: control that values are within range

export class Schedule {
  firstDay: number;
  numDays: number;
  numPeriods: number;
  comment: string;
  contents: ScheduleContent[];
  periods: SchedulePeriod[] = [];
  visiblePeriods: SchedulePeriod[];


  constructor(options: {
    firstDay?: number,
    numDays?: number,
    numPeriods?: number,
    comment?: string,
    contents?: ScheduleContent[],
    periods?: SchedulePeriod[]
  } = {}) {
    this.update(options);
  }

  update(options: {
    firstDay?: number,
    numDays?: number,
    numPeriods?: number,
    comment?: string,
    contents?: ScheduleContent[],
    periods?: SchedulePeriod[]
  } = {}) {
    this.firstDay = options.firstDay || this.firstDay || 0;
    this.numDays = options.numDays || this.numDays || Weekday.days.length;
    this.numPeriods = options.numPeriods || this.numPeriods || 1;
    this.comment = options.comment || this.comment;

    this.contents = options.contents || this.contents || [];
    this.periods = options.periods || this.periods || [];

    this.updateVisiblePeriods();
  }


  // EDITION
  getContent(day: number, period: number) {
    return this.contents.find(content => content.day === day && content.period === period);
  }

  addContent(day: number, period: number) {
    if (this.getContentInSlot(day, period)) {
      return;
    } else {
      const newPeriod = new ScheduleContent({
        period: period,
        day: day
      })
      this.contents.push(newPeriod);
      return newPeriod;
    }
  }

  editContent(oldContent: ScheduleContent, newContent: ScheduleContent) {
    const foundContent = this.contents.find(content => oldContent === content);

    if (foundContent) {
      if (this.isOverlapping(newContent, this.contents.filter(content => content !== oldContent))) {
        return;
      } else {
        foundContent.update(newContent);
        return foundContent;
      }
    } else {
      return;
    }
  }

  deleteContent(content: ScheduleContent) {
    const foundContent = this.contents.find(oldContent => oldContent === content);

    if (foundContent) {
      this.contents = this.contents.filter(oldContent => oldContent !== content);
      return;
    } else {
      return this.getContent(content.day, content.period);
    }
  }

  private getContentInSlot(day: number, period: number) {
    return this.contents.find(content =>
      content.day === day
      && content.period <= period
      && content.periodSpan >= period
    );
  }

  private isOverlapping(content: ScheduleContent, contents: ScheduleContent[] = this.contents) {
    return !!contents
      .map(slot => content.overlaps(slot))
      .find(overlaps => overlaps);
  }

  private updateVisiblePeriods() {
    this.periods = Array.from(Array(this.numPeriods))
      .map((period, key) => (this.periods[key]) ? this.periods[key] : new SchedulePeriod());
    this.visiblePeriods = this.periods.slice(0, this.numPeriods);
  }

  editPeriod(periodId: number, newPeriod: SchedulePeriod) {
    this.periods[periodId] = newPeriod;
    this.updateVisiblePeriods();

    return newPeriod;
  }

  getPeriod(id: number) {
    return this.periods[id];
  }

  decreaseDays() {
    this.numDays = Math.max(1, this.numDays - 1);
  }
  increaseDays() {
    this.numDays = Math.min(this.days.length, this.numDays + 1);
  }
  decreasePeriods() {
    this.numPeriods = Math.max(1, this.numPeriods - 1);
    this.updateVisiblePeriods();
  }
  increasePeriods() {
    this.numPeriods++;
    this.updateVisiblePeriods();
  }

  get canIncreasePeriods() {
    return true;
  }
  get canIncreaseDays() {
    return this.numDays < this.days.length;
  }
  get canDecreasePeriods() {
    return this.numPeriods > 1;
  }
  get canDecreaseDays() {
    return this.numDays > 1;
  }



  // GETTERS FOR DISPLAY
  get sortedDays() {
    return Weekday.getSortedDays(this.firstDay).slice(0, this.numDays);
  }


  // GETTERS FOR SELECT OPTIONS
  // This could be static but we might want to adapt the
  // number of periods available based on first period, for instance
  get days() {
    return Weekday.days;
  }

  get numDaysOptions() {
    return Array.from(Array(this.days.length + 1).keys()).slice(1);
  }
}
