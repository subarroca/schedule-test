import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';
import { Schedule } from 'app/schedule/shared/schedule';
import { ScheduleService } from 'app/schedule/shared/schedule.service';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.scss']
})
export class ScheduleSelectorComponent implements OnInit, OnDestroy {
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

  schedule: Schedule;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.form$$ = this.form
      .valueChanges
      .subscribe(
      schedule => this.scheduleService.updateSettings(schedule));

    this.scheduleService.localSchedule$
      .first()
      .subscribe(schedule => {
        this.schedule = schedule;
        this.updateForm();
      })
  }

  ngOnDestroy() {
    if (this.form$$) {
      this.form$$.unsubscribe();
    }
  }


  updateForm() {
    this.firstDayControl.setValue(this.schedule.firstDay);
    this.numDaysControl.setValue(this.schedule.numDays);
    this.firstPeriodControl.setValue(this.schedule.firstPeriod);
    this.numPeriodsControl.setValue(this.schedule.numPeriods);
    this.commentControl.setValue(this.schedule.comment);
  }

}
