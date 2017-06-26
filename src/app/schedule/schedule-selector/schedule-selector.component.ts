import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.scss']
})
export class ScheduleSelectorComponent implements OnInit, OnDestroy {
  @Input() numPeriods: number;
  @Output() numPeriodsChange: EventEmitter<number> = new EventEmitter();
  @Input() numDays: number;
  @Output() numDaysChange: EventEmitter<number> = new EventEmitter();
  @Input() firstPeriod: number;
  @Output() firstPeriodChange: EventEmitter<number> = new EventEmitter();
  @Input() firstDay: number;
  @Output() firstDayChange: EventEmitter<number> = new EventEmitter();

  firstDayControl = new FormControl();
  numDaysControl = new FormControl();
  firstPeriodControl = new FormControl();
  numPeriodsControl = new FormControl();

  form: FormGroup = new FormGroup({
    firstDay: this.firstDayControl,
    numDays: this.numDaysControl,
    firstPeriod: this.firstPeriodControl,
    numPeriods: this.numPeriodsControl,
  });
  firstDay$$: Subscription;
  firstPeriod$$: Subscription;
  numDays$$: Subscription;
  numPeriods$$: Subscription;

  constructor() { }

  ngOnInit() {
    this.firstDay$$ = this.emmitChange(this.firstDayControl, this.firstDayChange);
    this.firstPeriod$$ = this.emmitChange(this.firstPeriodControl, this.firstPeriodChange);
    this.numDays$$ = this.emmitChange(this.numDaysControl, this.numDaysChange);
    this.numPeriods$$ = this.emmitChange(this.numPeriodsControl, this.numPeriodsChange);
  }

  ngOnDestroy() {
    if (this.firstDay$$) {
      this.firstDay$$.unsubscribe();
    }
    if (this.firstPeriod$$) {
      this.firstPeriod$$.unsubscribe();
    }
    if (this.numDays$$) {
      this.numDays$$.unsubscribe();
    }
    if (this.numPeriods$$) {
      this.numPeriods$$.unsubscribe();
    }
  }

  emmitChange(control: FormControl, emitter: EventEmitter<any>) {
    return control
      .valueChanges
      .subscribe(
      value => emitter.emit(value)
      );
  }


  // GETTERS FOR SELECT OPTIONS
  get days() {
    return Weekday.days;
  }

  get periods() {
    return DayPeriod.periods;
  }

  get numDaysOptions() {
    return Array.from(Array(this.days.length).keys());
  }

  get numPeriodsOptions() {
    return Array.from(Array(this.periods.length).keys());
  }

}
