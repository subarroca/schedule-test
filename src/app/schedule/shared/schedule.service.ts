import { Subject } from 'rxjs/Rx';
import {
  SchedulePeriod,
} from './schedule-period';
import {
  ScheduleContent,
} from './schedule-content';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Schedule } from 'app/schedule/shared/schedule';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

@Injectable()
export class ScheduleService {
  newScheduleSubject: Subject<boolean> = new Subject<boolean>();
  newSchedule$: Observable<boolean> = this.newScheduleSubject.asObservable();

  localScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  localSchedule$: Observable<Schedule> = this.localScheduleSubject.asObservable();

  savedScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  savedSchedule$: Observable<Schedule> = this.savedScheduleSubject.asObservable();

  constructor() { }

  reset() {
    this.localScheduleSubject.next(new Schedule());
    this.newScheduleSubject.next(true);
  }

  import(schedule) {
    this.localScheduleSubject.next(new Schedule(schedule));
    this.newScheduleSubject.next(true);
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
    oldSchedule.update(schedule);
    this.localScheduleSubject.next(oldSchedule);
  }

  save() {
    // make a copy so they don't get coupled
    const schedule = this.localScheduleSubject.getValue();
    this.savedScheduleSubject.next(schedule.getCopy())
  }

}
