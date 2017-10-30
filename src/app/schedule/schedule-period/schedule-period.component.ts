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


  constructor(
    public dialog: MatDialog,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
  }


  @HostListener('click', ['$event'])
  edit(ev: Event) {
    ev.stopPropagation();

    const dialogRef = this.dialog.open(SchedulePeriodDialogComponent, {
      data: {
        period: this.period
      }
    })
      .afterClosed()
      .first()
      .subscribe((newPeriod: SchedulePeriod) => {
        this.schedule.editPeriod(this.id, newPeriod);
        this.scheduleService.updateLocalSchedule(this.schedule);
      });
  }

}
