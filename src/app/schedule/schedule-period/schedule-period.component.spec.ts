import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePeriodComponent } from './schedule-period.component';

describe('SchedulePeriodComponent', () => {
  let component: SchedulePeriodComponent;
  let fixture: ComponentFixture<SchedulePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
