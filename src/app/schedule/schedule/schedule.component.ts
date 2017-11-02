import {
  ScheduleContent,
} from '../shared/schedule-content';
import {
  ScheduleContentDialogComponent,
} from '../schedule-content-dialog/schedule-content-dialog.component';
import 'rxjs/add/operator/first';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  draggingContent: ScheduleContent;
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

  onDrop(ev, dayId: number, periodId: number) {
    console.log(ev, dayId, periodId);

    ev.dragData.update({
      day: dayId,
      period: periodId
    });
    this.draggingContent = null;
  }

  startDragging(content: ScheduleContent) {
    this.draggingContent = content;
  }

  isDraggingZone(dayId, periodId) {
    if (this.draggingContent) {
      return (this.draggingContent.day === dayId && this.draggingContent.period === periodId);
    }
  }
}
