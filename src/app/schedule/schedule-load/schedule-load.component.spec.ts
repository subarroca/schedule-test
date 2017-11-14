import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLoadComponent } from './schedule-load.component';

describe('ScheduleLoadComponent', () => {
  let component: ScheduleLoadComponent;
  let fixture: ComponentFixture<ScheduleLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
