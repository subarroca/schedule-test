import {
  SchedulePeriod,
} from '../shared/schedule-period';
import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-period-dialog',
  templateUrl: './schedule-period-dialog.component.html',
  styleUrls: ['./schedule-period-dialog.component.scss']
})
export class SchedulePeriodDialogComponent implements OnInit {
  period: SchedulePeriod;

  form: FormGroup = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  })

  constructor(
    public dialogRef: MatDialogRef<SchedulePeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.period = this.data.period;
    if (this.period && this.period.from && this.period.to) {
      this.form.setValue({
        from: `${this.period.from.h}:${this.period.from.m}`,
        to: `${this.period.to.h}:${this.period.to.m}`
      });
    }
  }


  save() {
    const from = (this.form.value.from || ':').split(':');
    const to = (this.form.value.to || ':').split(':');

    const period = new SchedulePeriod({
      from: {
        h: from[0],
        m: from[1],
      },
      to: {
        h: to[0],
        m: to[1]
      }
    });
    this.dialogRef.close(period);
  }
}
