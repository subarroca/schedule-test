import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { LibsModule } from 'app/libs/libs.module';
import { ScheduleSelectorComponent } from './schedule-selector/schedule-selector.component';

@NgModule({
  imports: [
    CommonModule,
    LibsModule
  ],
  declarations: [ScheduleComponent, ScheduleSelectorComponent],
  exports: [ScheduleComponent, ScheduleSelectorComponent]
})
export class ScheduleModule { }
