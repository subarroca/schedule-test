import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ScheduleSelectorDialogComponent } from './schedule-selector.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleService } from 'app/schedule/shared/schedule.service';

describe('ScheduleSelectorDialogComponent', () => {
  let component: ScheduleSelectorDialogComponent;
  let fixture: ComponentFixture<ScheduleSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LibsModule,
        NoopAnimationsModule
      ],
      declarations: [ScheduleSelectorDialogComponent],
      providers: [ScheduleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
