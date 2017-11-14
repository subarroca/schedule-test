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
  selector: 'app-schedule-settings',
  templateUrl: './schedule-settings.component.html',
  styleUrls: ['./schedule-settings.component.scss']
})
export class ScheduleSettingsComponent implements OnInit, OnDestroy {
  languageControl = new FormControl();
  firstDayControl = new FormControl();
  numDaysControl = new FormControl();
  numPeriodsControl = new FormControl();

  languages = [{
    key: 'en',
    value: 'English'
  }, {
    key: 'fr',
    value: 'French'
  }, {
    key: 'it',
    value: 'Italian'
  }, {
    key: 'de',
    value: 'German'
  }, {
    key: 'es',
    value: 'Spanish'
  }, {
    key: 'ru',
    value: 'Russian'
  }]

  form: FormGroup = new FormGroup({
    language: this.languageControl,
    firstDay: this.firstDayControl,
    numDays: this.numDaysControl,
    numPeriods: this.numPeriodsControl,
  });
  form$$: Subscription;

  schedule: Schedule;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.form$$ = this.form
      .valueChanges
      .debounceTime(200)
      .subscribe(
      schedule => this.scheduleService.updateSettings(schedule));

    this.scheduleService.newSchedule$
      .subscribe(() => {
        this.schedule = this.scheduleService.localScheduleSubject.getValue();
        this.updateForm();
      })
  }

  ngOnDestroy() {
    if (this.form$$) {
      this.form$$.unsubscribe();
    }
  }


  updateForm() {
    this.languageControl.setValue(this.schedule.language);
    this.firstDayControl.setValue(this.schedule.firstDay);
    this.numDaysControl.setValue(this.schedule.numDays);
    this.numPeriodsControl.setValue(this.schedule.numPeriods);
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
