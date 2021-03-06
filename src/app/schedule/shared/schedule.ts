import {
  ScheduleContent,
} from 'app/schedule/shared/schedule-content';
import { Weekday } from 'app/shared/weekday';
import { SchedulePeriod } from 'app/schedule/shared/schedule-period';



export class Schedule {
  firstDay: number;
  numDays: number;
  numPeriods: number;
  comment: string;
  contents: ScheduleContent[];
  periods: SchedulePeriod[] = [];
  language: string;

  // remove before exporting
  visiblePeriods: SchedulePeriod[];
  contentGrid: ScheduleContent[][];
  sortedDays: { key: number, value: string }[];


  constructor(options: {
    firstDay?: number,
    numDays?: number,
    numPeriods?: number,
    comment?: string,
    contents?: ScheduleContent[],
    periods?: SchedulePeriod[],
    language?: string
  } = {}) {
    this.update(options);
  }

  update(options: {
    firstDay?: number,
    numDays?: number,
    numPeriods?: number,
    comment?: string,
    contents?: ScheduleContent[],
    periods?: SchedulePeriod[],
    language?: string
  } = {}) {
    this.firstDay = options.firstDay || this.firstDay || 0;
    this.numDays = options.numDays || this.numDays || 7;
    this.numPeriods = options.numPeriods || this.numPeriods || 3;

    this.periods = options.periods ? options.periods.map(period => new SchedulePeriod(period)) : this.periods || [];
    this.contents = options.contents ? options.contents.map(content => new ScheduleContent(content)) : this.contents || [];

    this.comment = options.comment || this.comment;
    this.language = options.language || this.language || 'en';

    this.updateVisiblePeriods();
    this.updateContentGrid();
  }

  getCopy() {
    const schedule = new Schedule();
    schedule.firstDay = this.firstDay;
    schedule.language = this.language;
    schedule.numDays = this.numDays;
    schedule.numPeriods = this.numPeriods;
    schedule.comment = this.comment;
    schedule.contents = this.contents.map(content => content.getUpdatedCopy({}));
    schedule.periods = this.periods.map(period => new SchedulePeriod(period));

    return schedule;
  }


  // CONTENT EDITION
  getContent(day: number, period: number) {
    return this.contents.find(content =>
      content.day === day
      && content.period <= period
      && content.periodSpan >= period
      && content.daySpan >= day);
  }

  updateContent(contentId: string, newContent: ScheduleContent) {
    const foundContent = this.contents.find(content => content.uuid === contentId);

    if (this.isOverlapping(newContent, this.contents.filter(content => content.uuid !== contentId))) {
      return;
    } else {
      if (foundContent) {
        foundContent.update(newContent);
        this.updateContentGrid();
      } else {
        // added
        newContent.uuid = contentId;
        this.contents.push(newContent);
        this.updateContentGrid();
      }
      return newContent;
    }
  }

  deleteContent(content: ScheduleContent) {
    content.label = '';
    content.hasIncludedActivity = false;
    content.hasPremiumActivity = false;
    content.occupied = false;
    this.updateContent(content.uuid, content);
  }


  // PERIOD EDITION
  updateVisiblePeriods() {
    this.periods = Array.from(Array(this.numPeriods))
      .map((period, key) => (this.periods[key]) ? this.periods[key] : new SchedulePeriod());
    this.visiblePeriods = this.periods.slice(0, this.numPeriods);
  }

  updatePeriod(periodId: number, newPeriod: SchedulePeriod) {
    this.periods[periodId] = newPeriod;
    this.updateVisiblePeriods();

    return newPeriod;
  }

  getPeriod(id: number) {
    return this.periods[id];
  }



  // SETTINGS EDITION
  decreaseDays() {
    this.numDays = Math.max(1, this.numDays - 1);
    this.updateContentGrid();
  }
  increaseDays() {
    this.numDays = Math.min(7, this.numDays + 1);
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
    return this.numDays < 7;
  }
  get canDecreasePeriods() {
    return this.numPeriods > 1;
  }
  get canDecreaseDays() {
    return this.numDays > 1;
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
          if (grid[content.period + p] && grid[content.period + p][content.day + d]) {
            grid[content.period + p][content.day + d].occupied = true;
          }
        }
      }
      if (grid[content.period] && grid[content.period][content.day]) {
        grid[content.period][content.day] = content;
      }
    });

    this.contentGrid = grid.map(contentRow => contentRow.filter(content => !content.occupied));
  }

  getContentGridForDay(day: number) {
    const grid = Array.from(Array(this.numPeriods))
      .map((pv, p) =>
        this.contents.find(content =>
          content.day <= day && content.day + content.daySpan > day
          && content.period === p
        ) || new ScheduleContent());

    grid
      .forEach(content => {
        for (let p = 1; p < content.periodSpan; p++) {
          grid[content.period + p].occupied = true;
        }
      });

    return grid;
  }

  // getContentInSlot(day: number, period: number) {
  //   return this.contents.find(content =>
  //     content.day <= day && content.day + content.daySpan > day
  //     && content.period <= period && content.period + content.periodSpan > period);
  // }



  // RESIZING AND DRAGGING
  private isOverlapping(content: ScheduleContent, contents: ScheduleContent[] = this.contents) {
    return !!contents
      .map(slot => content.overlaps(slot))
      .find(overlaps => overlaps);
  }

  getDroppableSlots(content: ScheduleContent) {
    const contents = this.contents.filter(c => c.uuid !== content.uuid);

    // don't allow limits
    const grid: any[][] = Array.from(Array(this.numPeriods))
      .map((pv, p) =>
        Array.from(Array(this.numDays))
          .map((dv, d) => p + content.periodSpan < 1 + this.numPeriods && d + content.daySpan < 1 + this.numDays));

    contents.forEach(c => {
      // remove entouring to contents
      for (let p = 0; p < content.periodSpan; p++) {
        for (let d = 0; d < content.daySpan; d++) {
          try {
            grid[c.period - p][c.day - d] = false;
          } catch (e) { }
        }
      }
      // remove current content slots
      for (let p = 0; p < c.periodSpan; p++) {
        for (let d = 0; d < c.daySpan; d++) {
          try {
            grid[c.period + p][c.day + d] = false;
          } catch (e) { }
        }
      }
    });

    grid[content.period][content.day] = false;

    return grid;
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





  // GETTERS FOR SELECT OPTIONS
  // This could be static but we might want to adapt the
  // number of periods available based on first period, for instance
  get numDaysOptions() {
    return Array.from(Array(8).keys()).slice(1);
  }



  // element to export
  get exportable() {
    return {
      firstDay: this.firstDay,
      numDays: this.numDays,
      numPeriods: this.numPeriods,
      language: this.language,
      comment: this.comment,
      contents: this.contents
        .filter(content => content.day < this.numDays && content.period < this.numPeriods)
        .map(content => content.exportable),
      periods: this.periods
        .slice(0, this.numPeriods),
    };
  }


  get settings() {
    return {
      firstDay: this.firstDay,
      numDays: this.numDays,
      numPeriods: this.numPeriods,
      language: this.language
    };
  }
}
