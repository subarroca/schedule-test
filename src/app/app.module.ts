import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScheduleModule } from 'app/schedule/schedule.module';
import { LibsModule } from 'app/libs/libs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ScheduleModule,
    LibsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
