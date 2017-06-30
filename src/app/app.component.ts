import { Component } from '@angular/core';
import { Schedule } from 'app/schedule/shared/schedule';
import { ScheduleService } from 'app/schedule/shared/schedule.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schedule$: Observable<Schedule> = this.scheduleService.savedSchedule$;

  constructor(
    private scheduleService: ScheduleService
  ) { }


  saveSchedule() {
    this.scheduleService.save();
  }
}
