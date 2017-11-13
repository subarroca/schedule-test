import {
  ScheduleSettingsComponent,
} from './schedule-settings/schedule-settings.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibsModule } from 'app/libs/libs.module';

import {
  ScheduleContentDialogComponent,
} from './schedule-content-dialog/schedule-content-dialog.component';
import {
  ScheduleContentComponent,
} from './schedule-content/schedule-content.component';
import {
  SchedulePeriodDialogComponent,
} from './schedule-period-dialog/schedule-period-dialog.component';
import {
  SchedulePeriodComponent,
} from './schedule-period/schedule-period.component';
import {
  ScheduleComponent,
} from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    LibsModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleContentComponent,
    ScheduleContentDialogComponent,
    SchedulePeriodComponent,
    SchedulePeriodDialogComponent,
    ScheduleSettingsComponent
  ],
  exports: [
    ScheduleComponent,
    ScheduleSettingsComponent
  ],
  entryComponents: [
    ScheduleContentDialogComponent,
    SchedulePeriodDialogComponent
  ]
})
export class ScheduleModule { }
