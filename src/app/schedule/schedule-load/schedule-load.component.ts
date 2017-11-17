import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  ScheduleService,
} from '../shared/schedule.service';

@Component({
  selector: 'app-schedule-load',
  templateUrl: './schedule-load.component.html',
  styleUrls: ['./schedule-load.component.scss']
})
export class ScheduleLoadComponent implements OnInit {
  form: FormGroup;

  templates = [{
    key: 'summer-camp',
    value: 'Summer camps'
  }, {
    key: 'adult-school',
    value: 'Adult schools'
  }];


  constructor(
    public scheduleService: ScheduleService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      template: ['', Validators.required]
    })
  }

  loadTemplate() {
    this.http.get(`assets/templates/${this.form.controls.template.value}.json`)
      .subscribe(data =>
        this.scheduleService.import(data)
      )
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
