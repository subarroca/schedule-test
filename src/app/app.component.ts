import 'rxjs/add/observable/timer';

import { Component } from '@angular/core';
import {
  MatIconRegistry,
} from '@angular/material';
import {
  DomSanitizer,
} from '@angular/platform-browser';
import {
  Schedule,
} from 'app/schedule/shared/schedule';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schedule$: Observable<Schedule> = this.scheduleService.savedSchedule$;

  constructor(
    public scheduleService: ScheduleService,
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    matIconRegistry.registerFontClassAlias('alpadia', 'alp-ico');
    // matIconRegistry.setDefaultFontSetClass('alp-ico');
    matIconRegistry.addSvgIconSetInNamespace('alp', sanitizer.bypassSecurityTrustResourceUrl('assets/fonts/alpadia.svg'))
  }


  saveSchedule() {
    this.scheduleService.save();
  }

  resetSchedule() {
    this.scheduleService.reset();
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
