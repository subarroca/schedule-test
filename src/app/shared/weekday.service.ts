import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weekday } from 'app/shared/weekday';
import {
  BehaviorSubject,
} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WeekdayService {
  firstDay: number;
  numDays: number;

  private weekdaysSubject: BehaviorSubject<Weekday[]> = new BehaviorSubject<Weekday[]>([]);
  weekdays$: Observable<Weekday[]> = this.weekdaysSubject.asObservable();

  private sortedDaysSubject: BehaviorSubject<Weekday[]> = new BehaviorSubject<Weekday[]>([]);
  sortedDays$: Observable<Weekday[]> = this.sortedDaysSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadLanguage(lang: string) {
    if (lang) {
      this.http.get<Weekday[]>(`assets/weekdays/${lang}.json`)
        .subscribe(weekdays => {
          this.weekdaysSubject.next(weekdays);
          this.sortDays();
        });
    }
  }


  sortDays(firstDay = this.firstDay, numDays = this.numDays) {
    this.firstDay = firstDay;
    this.numDays = numDays;

    const days = Array.from(Array(7 * 2).keys())
      .slice(firstDay, firstDay + numDays)
      .map(day => this.weekdaysSubject.getValue()[day % 7]);

    this.sortedDaysSubject.next(days);
  }
}
