import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleSelectorComponent } from './schedule-selector/schedule-selector.component';
import { ScheduleContentComponent } from './schedule-content/schedule-content.component';

@NgModule({
  imports: [
    CommonModule,
    LibsModule
  ],
  declarations: [ScheduleComponent, ScheduleSelectorComponent, ScheduleContentComponent],
  exports: [ScheduleComponent, ScheduleSelectorComponent],
  entryComponents: [ScheduleContentComponent]
})
export class ScheduleModule { }
