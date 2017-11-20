import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ObservableMedia,
} from '@angular/flex-layout';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Weekday } from 'app/shared/weekday';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  WeekdayService,
} from '../../shared/weekday.service';
import {
  ScheduleContent,
} from '../shared/schedule-content';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @Input() isEditing: boolean;

  dayGridContent: ScheduleContent[] = [];
  selectedDay = 0;
  smallScreen$;
  droppableZones: boolean[][];
  cellSize: { width: number; height: number; };
  resizingContent: ScheduleContent;
  draggingContent: ScheduleContent;
  schedule: Schedule;
  schedule$$: Subscription;
  newSchedule$$: Subscription;
  sortedDays$: Observable<Weekday[]> = this.weekdayService.sortedDays$;

  form: FormGroup;
  form$$: Subscription;


  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private weekdayService: WeekdayService,
    private fb: FormBuilder,
    private media: ObservableMedia
  ) { }

  ngOnInit() {
    this.smallScreen$ = this.media
      .asObservable()
      .map(media => ['xs'/* , 'sm' */].includes(media.mqAlias));

    this.form = this.fb.group({
      comment: '',
    })
    this.schedule$$ = this.scheduleService.localSchedule$
      .subscribe(schedule => this.schedule = schedule);

    this.form$$ = this.form
      .valueChanges
      .subscribe(
      schedule => this.scheduleService.updateComment(schedule.comment));

    this.newSchedule$$ = this.scheduleService.newSchedule$
      .subscribe(() => {
        this.schedule = this.scheduleService.localScheduleSubject.getValue();
        this.selectDay(this.selectedDay);
        this.form.controls.comment.setValue(this.schedule.comment);
      })
  }
  ngOnDestroy() {
    if (this.schedule$$) {
      this.schedule$$.unsubscribe();
    }
    if (this.form$$) {
      this.form$$.unsubscribe();
    }
    if (this.newSchedule$$) {
      this.newSchedule$$.unsubscribe();
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
    // it might be that user changed table dimensions and no droppable zone is already calculated. Check both dimensions
    return () => {
      if (this.droppableZones && this.droppableZones[period]) {
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

  selectDay(day) {
    this.selectedDay = day;
    this.dayGridContent = this.schedule.getContentGridForDay(day);
  }
}
