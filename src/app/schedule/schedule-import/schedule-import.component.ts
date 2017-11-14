import {
  ScheduleService,
} from '../shared/schedule.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-import',
  templateUrl: './schedule-import.component.html',
  styleUrls: ['./schedule-import.component.scss']
})
export class ScheduleImportComponent implements OnInit {
  scheduleControl: FormControl = new FormControl();
  form: FormGroup = new FormGroup({
    schedule: this.scheduleControl
  });


  constructor(
    public scheduleService: ScheduleService
  ) { }

  ngOnInit() {
  }

  import() {
    this.scheduleService.import(JSON.parse(this.form.controls.schedule.value));
  }

}
