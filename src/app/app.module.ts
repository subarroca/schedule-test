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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),

    ScheduleModule,
    LibsModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
