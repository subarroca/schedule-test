import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ScheduleSelectorComponent } from './schedule-selector.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleService } from 'app/schedule/shared/schedule.service';

describe('ScheduleSelectorComponent', () => {
  let component: ScheduleSelectorComponent;
  let fixture: ComponentFixture<ScheduleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LibsModule,
        NoopAnimationsModule
      ],
      declarations: [ScheduleSelectorComponent],
      providers: [ScheduleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
