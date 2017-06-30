import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdGridListModule,
  MdInputModule,
  MdSelectModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdGridListModule,
    MdInputModule,
    MdSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    MdGridListModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    FlexLayoutModule
  ]
})
export class LibsModule { }
