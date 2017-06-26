import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdGridListModule,
  MdSelectModule,
  MdCardModule,
  MdButtonModule,
  MdInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdButtonModule,
    MdSelectModule,
    MdInputModule,
    MdCardModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    MdGridListModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdInputModule,
    FlexLayoutModule
  ]
})
export class LibsModule { }
