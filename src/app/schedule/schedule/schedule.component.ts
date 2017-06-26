import { Component, OnInit, Input } from '@angular/core';
import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() firstDay = 0;
  @Input() firstPeriod = 0;
  @Input() numPeriods = 3;
  @Input() numDays = 7;

  constructor() { }

  ngOnInit() {
  }

  get sortedDays() {
    return Weekday.getSortedDays(this.firstDay).slice(0, this.numDays);
  }

  get sortedPeriods() {
    return DayPeriod.getSortedPeriods(this.firstPeriod, this.numPeriods);
  }

}
