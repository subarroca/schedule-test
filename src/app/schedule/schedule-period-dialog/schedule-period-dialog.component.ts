import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

import {
  SchedulePeriod,
} from '../shared/schedule-period';

@Component({
  selector: 'app-schedule-period-dialog',
  templateUrl: './schedule-period-dialog.component.html',
  styleUrls: ['./schedule-period-dialog.component.scss']
})
export class SchedulePeriodDialogComponent implements OnInit {
  period: SchedulePeriod;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SchedulePeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      from: '',
      to: ''
    });


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
