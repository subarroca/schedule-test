import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Subscription } from 'rxjs/Subscription';

import {
  WeekdayService,
} from '../../shared/weekday.service';

@Component({
  selector: 'app-schedule-settings',
  templateUrl: './schedule-settings.component.html',
  styleUrls: ['./schedule-settings.component.scss']
})
export class ScheduleSettingsComponent implements OnInit, OnDestroy {
  weekdays$ = this.weekdayService.weekdays$;

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

  form: FormGroup;
  form$$: Subscription;

  schedule: Schedule;
  newSchedule$$: Subscription;

  constructor(
    private scheduleService: ScheduleService,
    private weekdayService: WeekdayService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      language: ['', Validators.required],
      firstDay: ['', Validators.required],
      numDays: ['', Validators.required],
      numPeriods: ['', Validators.required],
    });
    this.form$$ = this.form
      .valueChanges
      .debounceTime(200)
      .subscribe(
      settings => {
        this.scheduleService.updateSettings(settings)
      });

    this.newSchedule$$ = this.scheduleService.newSchedule$
      .subscribe(schedule => {
        this.schedule = schedule;
        this.updateForm();
        this.scheduleService.updateSettings(schedule.settings);
      })
  }

  ngOnDestroy() {
    if (this.form$$) {
      this.form$$.unsubscribe();
    }
    if (this.newSchedule$$) {
      this.newSchedule$$.unsubscribe();
    }
  }


  updateForm() {
    this.form.controls.language.setValue(this.schedule.language);
    this.form.controls.firstDay.setValue(this.schedule.firstDay);
    this.form.controls.numDays.setValue(this.schedule.numDays);
    this.form.controls.numPeriods.setValue(this.schedule.numPeriods);
  }

  decreasePeriods() {
    this.form.controls.numPeriods.setValue(this.form.controls.numPeriods.value - 1);
  }
  increasePeriods() {
    this.form.controls.numPeriods.setValue(this.form.controls.numPeriods.value + 1);
  }

  decreaseDays() {
    this.form.controls.numDays.setValue(this.form.controls.numDays.value - 1);
  }
  increaseDays() {
    this.form.controls.numDays.setValue(this.form.controls.numDays.value + 1);
  }

}
