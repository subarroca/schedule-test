import 'rxjs/add/operator/first';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.scss']
})
export class ScheduleSelectorDialogComponent implements OnInit, OnDestroy {
  firstDayControl = new FormControl();
  numDaysControl = new FormControl();
  numPeriodsControl = new FormControl();
  commentControl = new FormControl();

  form: FormGroup = new FormGroup({
    firstDay: this.firstDayControl,
    numDays: this.numDaysControl,
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
    this.numPeriodsControl.setValue(this.schedule.numPeriods);
    this.commentControl.setValue(this.schedule.comment);
  }

  decreasePeriods() {
    this.schedule.decreasePeriods();
    this.numPeriodsControl.setValue(this.schedule.numPeriods);
  }
  increasePeriods() {
    this.schedule.increasePeriods();
    this.numPeriodsControl.setValue(this.schedule.numPeriods);
  }

  decreaseDays() {
    this.schedule.decreaseDays();
    this.numDaysControl.setValue(this.schedule.numDays);
  }
  increaseDays() {
    this.schedule.increaseDays();
    this.numDaysControl.setValue(this.schedule.numDays);
  }

}
