import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';
import * as iconList from 'app/data/icons.json';

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
  icons;
  content: ScheduleContent;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ScheduleContentDialogComponent>,
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.icons = iconList;
    this.content = this.data.content;

    this.form = this.fb.group({
      label: this.content.label || '',
      hasPremiumActivity: !!this.content.hasPremiumActivity,
      hasIncludedActivity: !!this.content.hasIncludedActivity,
      icon: this.content.icon || '',
      highlight: !!this.content.highlight,
    }, {
        validator: this.minimumInfo
      });
  }

  minimumInfo(group): any {
    const label = group.controls.label.value;
    const included = group.controls.hasIncludedActivity.value;
    const premium = group.controls.hasPremiumActivity.value;

    if (label.length > 0 || included || premium) {
      return null;
    }

    return {
      isValid: false
    };
  }


  save() {
    this.scheduleService.updateContent(this.content.uuid, this.content.getUpdatedCopy({
      label: this.form.value.label,
      icon: this.form.value.icon,
      highlight: this.form.value.highlight,
      hasPremiumActivity: this.form.value.hasPremiumActivity,
      hasIncludedActivity: this.form.value.hasIncludedActivity,
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
