import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

import {
  ScheduleContent,
} from '../shared/schedule-content';
import {
  ScheduleService,
} from '../shared/schedule.service';

@Component({
  selector: 'app-schedule-content-dialog',
  templateUrl: './schedule-content-dialog.component.html',
  styleUrls: ['./schedule-content-dialog.component.scss']
})
export class ScheduleContentDialogComponent implements OnInit {
  content: ScheduleContent;
  form: FormGroup = new FormGroup({
    label: new FormControl(),
    highlight: new FormControl()
  })

  constructor(
    public dialogRef: MatDialogRef<ScheduleContentDialogComponent>,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.content = this.data.content;
  }


  save() {
    this.scheduleService.updateContent(this.content.uuid, this.content.getUpdatedCopy({
      label: this.form.value.label,
      icon: this.form.value.icon,
      highlight: this.form.value.highlight
    }));

    this.dialogRef.close({
      type: 'update',
      data: this.content
    });
  }
  delete() {
    this.dialogRef.close({
      type: 'delete'
    });
  }


}
