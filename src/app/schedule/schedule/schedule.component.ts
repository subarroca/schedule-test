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
    if (ev) {
      ev.stopPropagation();
    }

    const content = this.schedule.addContent(day, period);
    this.scheduleService.updateLocalSchedule(this.schedule);

    const dialogRef = this.dialog.open(ScheduleContentDialogComponent, {
      data: {
        content: content
      }
    })
      .afterClosed()
      .first()
      .subscribe(operation => {
        if (operation) {
          switch (operation.type) {
            case 'delete':
              this.schedule.deleteContent(content);
              this.scheduleService.updateLocalSchedule(this.schedule);
              break;
            case 'update':
              if (operation.data.label) {
                this.schedule.editContent(content, operation.data);
              } else {
                this.schedule.deleteContent(content);
              }
              this.scheduleService.updateLocalSchedule(this.schedule);
              break;
          }
        } else {
          this.schedule.deleteContent(content);
          this.scheduleService.updateLocalSchedule(this.schedule);
        }
      });
  }
}
