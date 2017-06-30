import { DayPeriod } from 'app/shared/day-period';
import { Weekday } from 'app/shared/weekday';
import { SchedulePeriodContent } from 'app/schedule/shared/schedule-period-content';


// TODO: control that values are within range

export class Schedule {
  firstDay: number;
  numDays: number;
  firstPeriod: number;
  numPeriods: number;
  comment: string;

  periodContents: SchedulePeriodContent[];


  constructor(options: {
    firstDay?: number,
    numDays?: number,
    firstPeriod?: number,
    numPeriods?: number,
    comment?: string,
    periodContents?: SchedulePeriodContent[]
  } = {}) {
    this.update(options);
  }

  update(options: {
    firstDay?: number,
    numDays?: number,
    firstPeriod?: number,
    numPeriods?: number,
    comment?: string,
    periodContents?: SchedulePeriodContent[]
  } = {}) {
    this.firstDay = options.firstDay || this.firstDay || 0;
    this.numDays = options.numDays || this.numDays || Weekday.days.length;
    this.firstPeriod = options.firstPeriod || this.firstPeriod || 0;
    this.numPeriods = options.numPeriods || this.numPeriods || DayPeriod.periods.length;
    this.comment = options.comment || this.comment;

    this.periodContents = options.periodContents || this.periodContents || [];
  }


  // EDITION
  getContent(day: number, period: number) {
    return this.periodContents.find(content => content.day === day && content.startPeriod === period);
  }

  addContent(day: number, period: number) {
    if (this.getContentInSlot(day, period)) {
      return;
    } else {
      const newPeriod = new SchedulePeriodContent({
        startPeriod: period,
        day: day
      })
      this.periodContents.push(newPeriod);
      return newPeriod;
    }
  }

  editContent(oldContent: SchedulePeriodContent, newContent: SchedulePeriodContent) {
    const foundContent = this.periodContents.find(content => oldContent === content);

    if (foundContent) {
      if (this.isOverlapping(newContent, this.periodContents.filter(content => content !== oldContent))) {
        return;
      } else {
        foundContent.update(newContent);
        return foundContent;
      }
    } else {
      return;
    }
  }

  deleteContent(content: SchedulePeriodContent) {
    const foundContent = this.periodContents.find(oldContent => oldContent === content);

    if (foundContent) {
      this.periodContents = this.periodContents.filter(oldContent => oldContent !== content);
      return;
    } else {
      return this.getContent(content.day, content.startPeriod);
    }
  }

  private getContentInSlot(day: number, period: number) {
    return this.periodContents.find(content =>
      content.day === day
      && content.startPeriod <= period
      && content.endPeriod >= period
    );
  }

  private isOverlapping(content: SchedulePeriodContent, contents: SchedulePeriodContent[] = this.periodContents) {
    return !!contents
      .map(slot => content.overlaps(slot))
      .find(overlaps => overlaps);
  }



  // GETTERS FOR DISPLAY
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
    return Array.from(Array(this.days.length + 1).keys()).slice(1);
  }

  get numPeriodsOptions() {
    return Array.from(Array(this.periods.length + 1).keys()).slice(1);
  }
}
