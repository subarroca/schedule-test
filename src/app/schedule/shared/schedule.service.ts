import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Schedule } from 'app/schedule/shared/schedule';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleService {
  localScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  localSchedule$: Observable<Schedule> = this.localScheduleSubject.asObservable();

  savedScheduleSubject: BehaviorSubject<Schedule> = new BehaviorSubject<Schedule>(new Schedule());
  savedSchedule$: Observable<Schedule> = this.savedScheduleSubject.asObservable();

  constructor() { }

  updateLocalSchedule(schedule) {
    this.localScheduleSubject.next(schedule);
  }

  save() {
    // make a copy so they don't get coupled
    this.localSchedule$
      .first()
      .subscribe(
      schedule => this.savedScheduleSubject.next(new Schedule(schedule))
      );
  }

}
