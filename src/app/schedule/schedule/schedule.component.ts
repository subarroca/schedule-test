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
  cellSize: { width: number; height: number; };
  resizingContent: ScheduleContent;
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
    ev.dragData.update({
      day: dayId,
      period: periodId
    });
    this.schedule.updateContentGrid();
    this.endDragging();
  }

  startDragging(content: ScheduleContent) {
    this.draggingContent = content;
  }

  endDragging() {
    this.draggingContent = null;
  }
  getAllowsDrop(day, period) {
    return (dragData: ScheduleContent) =>
      (day + dragData.daySpan <= this.schedule.numDays) && (period + dragData.periodSpan <= this.schedule.numPeriods);
  }

  startResizing(ev, content: ScheduleContent) {
    console.log(content);

    if (content) {
      this.cellSize = {
        width: ev.rectangle.width / content.daySpan,
        height: ev.rectangle.height / content.periodSpan
      };
      this.resizingContent = this.schedule.getContentInSlot(content.day, content.period);
    }
  }

  endResizing(ev) {
    console.log(this.resizingContent);

    if (this.resizingContent) {
      if (this.cellSize) {
        const resize = {
          daySpan: Math.round(Math.abs(ev.rectangle.width) / this.cellSize.width),
          periodSpan: Math.round(Math.abs(ev.rectangle.height) / this.cellSize.height),
          period: this.resizingContent.period,
          day: this.resizingContent.day,
        };

        const increase = {
          day: resize.daySpan - this.resizingContent.daySpan,
          period: resize.periodSpan - this.resizingContent.periodSpan
        }

        const update = Object.assign({}, resize);

        // some combos actually move the starting cell
        if (ev.edges.top < 0) {
          update.period = this.resizingContent.period - increase.period;
        }
        if (ev.edges.left < 0) {
          update.day = this.resizingContent.day - increase.day;
        }

        // console.log(ev, update, this.resizingContent);

        this.resizingContent.update(update);
        this.schedule.updateContentGrid();
      }
    }

    this.cellSize = null;
    this.resizingContent = null;
  }

  isDraggingZoneDisabled(dayId, periodId) {
    if (this.draggingContent) {
      return (this.draggingContent.day === dayId && this.draggingContent.period === periodId)
        || !this.getAllowsDrop(dayId, periodId)(this.draggingContent);
    }
  }

  // getSubZones(content: ScheduleContent) {
  //   return Array(content.daySpan * content.periodSpan).fill(1);
  // }
}
