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

import * as iconList from 'app/data/icons.json';

@Component({
  selector: 'app-schedule-content-dialog',
  templateUrl: './schedule-content-dialog.component.html',
  styleUrls: ['./schedule-content-dialog.component.scss']
})
export class ScheduleContentDialogComponent implements OnInit {
  icons;
  content: ScheduleContent;
  form: FormGroup = new FormGroup({
    label: new FormControl(),
    icon: new FormControl(),
    highlight: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<ScheduleContentDialogComponent>,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.icons = iconList;
  }

  ngOnInit() {
    this.content = this.data.content;
    this.form.setValue({
      label: this.content.label || '',
      icon: this.content.icon || '',
      highlight: !!this.content.highlight,
    })
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

  selectIcon(icon: string) {
    this.form.controls.icon.setValue(icon);
  }

}
