import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ScheduleSettingsComponent } from './schedule-settings.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleService } from 'app/schedule/shared/schedule.service';

describe('ScheduleSettingsComponent', () => {
  let component: ScheduleSettingsComponent;
  let fixture: ComponentFixture<ScheduleSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LibsModule,
        NoopAnimationsModule
      ],
      declarations: [ScheduleSettingsComponent],
      providers: [ScheduleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
