import {
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { LibsModule } from 'app/libs/libs.module';
import {
  ScheduleModule,
} from 'app/schedule/schedule.module';
import {
  ScheduleService,
} from 'app/schedule/shared/schedule.service';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material';
import { ScheduleImportComponent } from './schedule/schedule-import/schedule-import.component';
import { ScheduleLoadComponent } from './schedule/schedule-load/schedule-load.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleImportComponent,
    ScheduleLoadComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),

    ScheduleModule,
    LibsModule
  ],
  providers: [
    ScheduleService,
    MatIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
