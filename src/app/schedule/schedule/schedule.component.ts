import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import 'rxjs/add/operator/first';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Subscription } from 'rxjs/Subscription';

import {
  ScheduleContent,
} from '../shared/schedule-content';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  droppableZones: boolean[][];
  cellSize: { width: number; height: number; };
  resizingContent: ScheduleContent;
  draggingContent: ScheduleContent;
  schedule: Schedule;
  schedule$$: Subscription;
  commentControl = new FormControl();

  form: FormGroup = new FormGroup({
    comment: this.commentControl,
  });
  form$$: Subscription;


  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.schedule$$ = this.scheduleService.localSchedule$
      .subscribe(schedule => this.schedule = schedule);

    this.form$$ = this.form
      .valueChanges
      .subscribe(
      schedule => this.scheduleService.updateSettings(schedule));

    this.scheduleService.newSchedule$
      .subscribe(() => {
        this.schedule = this.scheduleService.localScheduleSubject.getValue();
        this.commentControl.setValue(this.schedule.comment);
      })
  }
  ngOnDestroy() {
    if (this.schedule$$) {
      this.schedule$$.unsubscribe();
    }
    if (this.form$$) {
      this.form$$.unsubscribe();
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
    this.droppableZones = this.schedule.getDroppableSlots(content);
  }

  endDragging() {
    this.draggingContent = null;
  }
  getAllowsDrop(day, period) {
    return () => {
      if (this.droppableZones) {
        return this.droppableZones[period][day];
      }
    }
  }

  startResizing(ev, content: ScheduleContent) {
    if (content) {
      this.cellSize = {
        width: ev.rectangle.width / content.daySpan,
        height: ev.rectangle.height / content.periodSpan
      };
      this.resizingContent = content;
    }
  }

  endResizing(ev) {
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

        this.scheduleService.updateContent(this.resizingContent.uuid, new ScheduleContent(update));
      }
    }

    this.cellSize = null;
    this.resizingContent = null;
  }

  // getSubZones(content: ScheduleContent) {
  //   return Array(content.daySpan * content.periodSpan).fill(1);
  // }
}
