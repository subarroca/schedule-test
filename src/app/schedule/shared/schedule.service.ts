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
  newScheduleSubject: Subject<boolean> = new Subject<boolean>();
  newSchedule$: Observable<boolean> = this.newScheduleSubject.asObservable();

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
    this.newScheduleSubject.next(true);
    this.weekdayService.sortDays(schedule.firstDay, schedule.numDays);
    this.weekdayService.loadLanguage(schedule.language);
  }

  import(schedule) {
    this.localScheduleSubject.next(new Schedule(schedule));
    this.newScheduleSubject.next(true);
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
  updateSettings(schedule: Schedule) {
    const oldSchedule = this.localScheduleSubject.getValue();

    if (oldSchedule.firstDay !== schedule.firstDay || oldSchedule.numDays !== schedule.numDays) {
      this.weekdayService.sortDays(schedule.firstDay, schedule.numDays);
    }
    if (oldSchedule.language !== schedule.language) {
      this.weekdayService.loadLanguage(schedule.language);
    }

    oldSchedule.update(schedule);
    this.localScheduleSubject.next(oldSchedule);
  }

  save() {
    // make a copy so they don't get coupled
    const schedule = this.localScheduleSubject.getValue();
    this.savedScheduleSubject.next(schedule.getCopy())
  }

}
