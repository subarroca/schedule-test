import {
  Component,
  ElementRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
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

  scheduleControl: FormControl = new FormControl();
  form: FormGroup = new FormGroup({
    schedule: this.scheduleControl
  })

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

  importSchedule() {
    this.scheduleService.import(JSON.parse(this.form.controls.schedule.value));
  }
}
