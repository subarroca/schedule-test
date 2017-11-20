import 'rxjs/add/operator/first';

import { Injectable } from '@angular/core';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import { Subject } from 'rxjs/Subject';
import {
  BehaviorSubject,
} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
  WeekdayService,
} from '../../shared/weekday.service';
import {
  ScheduleContent,
} from './schedule-content';
import {
  SchedulePeriod,
} from './schedule-period';

@Injectable()
export class ScheduleService {
  newScheduleSubject: Subject<Schedule> = new Subject<Schedule>();
  newSchedule$: Observable<Schedule> = this.newScheduleSubject.asObservable();

  localScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  localSchedule$: Observable<Schedule> = this.localScheduleSubject.asObservable();

  savedScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  savedSchedule$: Observable<Schedule> = this.savedScheduleSubject.asObservable();

  constructor(
    private weekdayService: WeekdayService
  ) { }

  reset() {
    const schedule = new Schedule();
    this.localScheduleSubject.next(schedule);
    // save a copy so changes don't affect directly the object
    this.newScheduleSubject.next(schedule.getCopy());
    this.weekdayService.sortDays(schedule.firstDay, schedule.numDays);
    this.weekdayService.loadLanguage(schedule.language);
  }

  import(schedule) {
    schedule = new Schedule(schedule);
    this.localScheduleSubject.next(schedule);
    // save a copy so changes don't affect directly the object
    this.newScheduleSubject.next(schedule.getCopy());
    this.weekdayService.sortDays(schedule.firstDay, schedule.numDays);
    this.weekdayService.loadLanguage(schedule.language);
  }

  updateContent(contentId: string, newContent: ScheduleContent) {
    const schedule = this.localScheduleSubject.getValue();
    schedule.updateContent(contentId, newContent);
    this.localScheduleSubject.next(schedule);
  }
  deleteContent(content: ScheduleContent) {
    const schedule = this.localScheduleSubject.getValue();
    schedule.deleteContent(content);
    this.localScheduleSubject.next(schedule);
  }
  updatePeriod(periodId: number, period: SchedulePeriod) {
    const schedule = this.localScheduleSubject.getValue();
    schedule.updatePeriod(periodId, period);
    this.localScheduleSubject.next(schedule);
  }
  updateComment(comment: string) {
    const schedule = this.localScheduleSubject.getValue();
    schedule.update({ comment: comment });
    this.localScheduleSubject.next(schedule);
  }
  updateSettings(settings: {
    firstDay: number,
    numDays: number,
    numPeriods: number,
    language: string
  }) {
    const oldSchedule = this.localScheduleSubject.getValue();
    settings.numDays = Math.max(1, Math.min(7, settings.numDays));
    settings.numPeriods = Math.max(1, settings.numPeriods);

    if (oldSchedule.firstDay !== settings.firstDay || oldSchedule.numDays !== settings.numDays) {
      this.weekdayService.sortDays(settings.firstDay, settings.numDays);
    }
    if (oldSchedule.numPeriods !== settings.numPeriods) {
      oldSchedule.updateVisiblePeriods();
    }
    if (oldSchedule.language !== settings.language) {
      this.weekdayService.loadLanguage(settings.language);
    }

    oldSchedule.update(settings);
    this.localScheduleSubject.next(oldSchedule);
  }

  save() {
    // make a copy so they don't get coupled
    const schedule = this.localScheduleSubject.getValue();
    this.savedScheduleSubject.next(schedule.getCopy())
  }

}
