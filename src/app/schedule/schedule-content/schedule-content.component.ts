import {
  Component,
  HostBinding,
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
  @HostBinding('class.editing') @Input() isEditing: boolean;

  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
  }

  edit(ev: Event = null, isNew = false) {
    if (this.isEditing) {
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
                this.scheduleService.deleteContent(this.content);
                break;
              case 'update':
                this.update(this.content, operation.data, isNew)
                break;
            }
          }
        });
    }
  }

  update(oldContent, newContent, isNew) {
    if (!newContent.label && isNew) {
      this.scheduleService.deleteContent(this.content);
    } else {
      this.scheduleService.updateContent(this.content.uuid, newContent);
    }
  }
}
