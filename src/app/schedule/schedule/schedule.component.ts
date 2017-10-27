import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { Weekday } from 'app/shared/weekday';
import { DayPeriod } from 'app/shared/day-period';
import { Schedule } from 'app/schedule/shared/schedule';
import { SchedulePeriodContent } from 'app/schedule/shared/schedule-period-content';
import { ScheduleContentComponent } from 'app/schedule/schedule-content/schedule-content.component';
import { ScheduleService } from 'app/schedule/shared/schedule.service';
import 'rxjs/add/operator/first';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule: Schedule;
  schedule$$: Subscription;

  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.schedule$$ = this.scheduleService.localSchedule$
      .subscribe(schedule => this.schedule = schedule);
  }
  ngOnDestroy() {
    if (this.schedule$$) {
      this.schedule$$.unsubscribe();
    }
  }


  // CONTENT EDITION
  addContent(ev: Event, day: number, period: number) {
    this.schedule.addContent(day, period);
    this.scheduleService.updateLocalSchedule(this.schedule);
  }

  editContent(ev: Event, content: SchedulePeriodContent) {
    ev.stopPropagation();

    const dialogRef = this.dialog.open(ScheduleContentComponent)
      .afterClosed()
      .first()
      .subscribe(label => {
        const newContent = new SchedulePeriodContent(content);
        newContent.label = label;
        this.schedule.editContent(content, newContent);
        this.scheduleService.updateLocalSchedule(this.schedule);
      });
  }

  deleteContent(ev: Event, content: SchedulePeriodContent) {
    ev.stopPropagation();

    this.schedule.deleteContent(content);
    this.scheduleService.updateLocalSchedule(this.schedule);
  }

}
