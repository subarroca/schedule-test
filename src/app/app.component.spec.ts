import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleModule } from 'app/schedule/schedule.module';
import { ScheduleService } from 'app/schedule/shared/schedule.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LibsModule,
        ScheduleModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ScheduleService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
