import { HttpClient } from '@angular/common/http';
import {
  ScheduleService,
} from '../shared/schedule.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-load',
  templateUrl: './schedule-load.component.html',
  styleUrls: ['./schedule-load.component.scss']
})
export class ScheduleLoadComponent implements OnInit {
  templateControl: FormControl = new FormControl();
  form: FormGroup = new FormGroup({
    template: this.templateControl
  })

  templates = [{
    key: 'summer-camp',
    value: 'Summer camps'
  }, {
    key: 'adult-school',
    value: 'Adult schools'
  }];


  constructor(
    public scheduleService: ScheduleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  load() {
    this.http.get(`assets/templates/${this.form.controls.template.value}.json`)
      .subscribe(data =>
        this.scheduleService.import(data)
      )
  }

}
