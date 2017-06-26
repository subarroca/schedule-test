import { Component, OnInit, Input } from '@angular/core';
import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';
import { Schedule } from 'app/schedule/shared/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() schedule: Schedule = new Schedule();

  constructor() { }

  ngOnInit() {
  }


}
