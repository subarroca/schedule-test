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

  // parse before exporting
  periods: SchedulePeriod[] = [];
  visiblePeriods: SchedulePeriod[];
  contentGrid: ScheduleContent[][];
  sortedDays: { key: number, value: string }[];


  constructor(options: {
    firstDay?: number,
    numDays?: number,
    numPeriods?: number,
    comment?: string,
    contents?: ScheduleContent[],
    periods?: SchedulePeriod[]
  } = {}) {
    // TODO: For test purposes only!!!!
    options.contents = [new ScheduleContent({
      label: 'test',
      period: 1,
      day: 1,
      periodSpan: 2,
      daySpan: 2
    })];
    options.numPeriods = 3;


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

    this.sortedDays = this.sortDays();
    this.updateVisiblePeriods();
    this.updateContentGrid();
  }


  // EDITION
  getContent(day: number, period: number) {
    return this.contents.find(content => content.day === day && content.period === period);
  }

  editContent(oldContent: ScheduleContent, newContent: ScheduleContent) {
    const foundContent = this.contents.find(content => oldContent === content);

    if (foundContent) {
      if (this.isOverlapping(newContent, this.contents.filter(content => content !== oldContent))) {
        return;
      } else {
        foundContent.update(newContent);
        this.updateContentGrid();
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
      this.updateContentGrid();
      return;
    } else {
      return this.getContent(content.day, content.period);
    }
  }

  getContentInSlot(day: number, period: number) {
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
    this.sortedDays = this.sortDays();
    this.updateContentGrid();
  }
  increaseDays() {
    this.numDays = Math.min(this.days.length, this.numDays + 1);
    this.sortedDays = this.sortDays();
    this.updateContentGrid();
  }
  decreasePeriods() {
    this.numPeriods = Math.max(1, this.numPeriods - 1);
    this.updateVisiblePeriods();
    this.updateContentGrid();
  }
  increasePeriods() {
    this.numPeriods++;
    this.updateVisiblePeriods();
    this.updateContentGrid();
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


  resizeContent(content: ScheduleContent, daySpan: number, periodSpan: number, day: number, period: number) {
    if (day === undefined) {
      day = content.day
    }
    if (period === undefined) {
      period = content.period
    }
    const fakeContent = new ScheduleContent(Object.assign({}, period, { day: day, period: period }));
    if (this.canResizeContent(fakeContent, daySpan, periodSpan)) {
      content.update({
        day: day,
        period: period,
        daySpan: daySpan,
        periodSpan: periodSpan
      })
    }
  }

  canResizeContent(content: ScheduleContent, daySpan: number, periodSpan: number) {
    return content.day + daySpan <= this.numDays && content.period + periodSpan <= this.numPeriods
  }



  // Don't use a getter or drag and drop will break
  sortDays() {
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



  updateContentGrid() {
    // 1. Mark all as empty
    const grid: ScheduleContent[][] = Array.from(Array(this.numPeriods))
      .map((pv, p) =>
        Array.from(Array(this.numDays))
          .map((dv, d) => new ScheduleContent({
            period: p,
            day: d
          }))
      );

    // 2. Fill with actual contents and spans
    this.contents.forEach(content => {
      for (let p = 0; p < content.periodSpan; p++) {
        for (let d = 0; d < content.daySpan; d++) {
          grid[content.period + p][content.day + d].occupied = true;
        }
      }
      grid[content.period][content.day] = content;
    });

    this.contentGrid = grid;
  }
}
