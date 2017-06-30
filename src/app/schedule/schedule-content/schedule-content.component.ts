import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-content',
  templateUrl: './schedule-content.component.html',
  styleUrls: ['./schedule-content.component.scss']
})
export class ScheduleContentComponent implements OnInit {
  form: FormGroup = new FormGroup({
    label: new FormControl()
  })

  constructor(
    public dialogRef: MdDialogRef<ScheduleContentComponent>
  ) { }

  ngOnInit() {
  }


  save() {
    this.dialogRef.close(this.form.value.label)
  }


}
