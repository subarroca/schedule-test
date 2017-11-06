import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  ScheduleContentDialogComponent,
} from '../schedule-content-dialog/schedule-content-dialog.component';
import { Schedule } from '../shared/schedule';
import {
  ScheduleContent,
} from '../shared/schedule-content';
import {
  ScheduleService,
} from '../shared/schedule.service';

@Component({
  selector: 'app-schedule-content',
  templateUrl: './schedule-content.component.html',
  styleUrls: ['./schedule-content.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  @Input() content: ScheduleContent;
  @Input() schedule: Schedule;

  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
  }

  edit(ev: Event = null, isNew = false) {
    if (ev) {
      ev.stopPropagation();
    }

    const dialogRef = this.dialog.open(ScheduleContentDialogComponent, {
      data: {
        content: this.content
      }
    })
      .afterClosed()
      .first()
      .subscribe(operation => {
        if (operation) {
          switch (operation.type) {
            case 'delete':
              this.schedule.deleteContent(this.content);
              this.scheduleService.updateLocalSchedule(this.schedule);
              break;
            case 'update':
              this.update(this.content, operation.data, isNew)
              break;
          }
        }
      });
  }

  update(oldContent, newContent, isNew) {
    if (!newContent.label && isNew) {
      this.schedule.deleteContent(this.content);
    } else {
      this.schedule.editContent(this.content, newContent);
    }
    this.scheduleService.updateLocalSchedule(this.schedule);
  }
}
