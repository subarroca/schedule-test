import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';
import { Schedule } from 'app/schedule/shared/schedule';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.scss']
})
export class ScheduleSelectorComponent implements OnInit, OnDestroy {
  @Input() schedule: Schedule = new Schedule();
  @Output() scheduleChange: EventEmitter<Schedule> = new EventEmitter();

  firstDayControl = new FormControl();
  numDaysControl = new FormControl();
  firstPeriodControl = new FormControl();
  numPeriodsControl = new FormControl();
  commentControl = new FormControl();

  form: FormGroup = new FormGroup({
    firstDay: this.firstDayControl,
    numDays: this.numDaysControl,
    firstPeriod: this.firstPeriodControl,
    numPeriods: this.numPeriodsControl,
    comment: this.commentControl,
  });
  form$$: Subscription;

  constructor() { }

  ngOnInit() {
    this.form$$ = this.form
      .valueChanges
      .subscribe(
      schedule => this.scheduleChange.emit(new Schedule(schedule))
      );
  }

  ngOnDestroy() {
    if (this.form$$) {
      this.form$$.unsubscribe();
    }
  }

}
