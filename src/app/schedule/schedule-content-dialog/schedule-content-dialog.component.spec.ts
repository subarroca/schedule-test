import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleContentComponent } from './schedule-content-dialog.component';

// TODO: See what happens with MatDialogRef
xdescribe('ScheduleContentComponent', () => {
  let component: ScheduleContentComponent;
  let fixture: ComponentFixture<ScheduleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
