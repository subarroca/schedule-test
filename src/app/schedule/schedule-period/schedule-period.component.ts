import {
  ScheduleService,
} from '../shared/schedule.service';
import {
  SchedulePeriodDialogComponent,
} from '../schedule-period-dialog/schedule-period-dialog.component';
import { Schedule } from '../shared/schedule';
import {
  SchedulePeriod,
} from '../shared/schedule-period';
import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-schedule-period',
  templateUrl: './schedule-period.component.html',
  styleUrls: ['./schedule-period.component.scss']
})
export class SchedulePeriodComponent implements OnInit {
  @Input() id: number;
  @Input() period: SchedulePeriod;
  @Input() schedule: Schedule;
  @HostBinding('class.editing') @Input() isEditing: boolean;


  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  edit(ev: Event) {
    if (this.isEditing) {
      ev.stopPropagation();

      const dialogRef = this.dialog.open(SchedulePeriodDialogComponent, {
        data: {
          period: this.period
        }
      })
        .afterClosed()
        .first()
        .subscribe((newPeriod: SchedulePeriod) => {
          this.scheduleService.updatePeriod(this.id, newPeriod);
        });
    }
  }

}
