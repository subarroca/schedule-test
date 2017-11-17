import { Observable } from 'rxjs/Rx';
import {
  ScheduleService,
} from '../shared/schedule.service';
import {
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-schedule-import',
  templateUrl: './schedule-import.component.html',
  styleUrls: ['./schedule-import.component.scss']
})
export class ScheduleImportComponent implements OnInit {
  form: FormGroup;


  constructor(
    public scheduleService: ScheduleService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      schedule: ['', Validators.required]
    })
  }

  import() {
    this.scheduleService.import(JSON.parse(this.form.controls.schedule.value));
  }

  scrollTop() {
    Observable.timer(500, 0)
      .first()
      .subscribe(() =>
        window.scroll({
          top: 0,
          behavior: 'smooth'
        }));
  }
}
