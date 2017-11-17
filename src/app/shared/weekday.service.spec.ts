import { TestBed, inject } from '@angular/core/testing';

import { WeekdayService } from './weekday.service';

describe('WeekdayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeekdayService]
    });
  });

  it('should be created', inject([WeekdayService], (service: WeekdayService) => {
    expect(service).toBeTruthy();
  }));
});
