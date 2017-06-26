import { Component } from '@angular/core';
import { Schedule } from 'app/schedule/shared/schedule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schedule: Schedule = new Schedule();
}
