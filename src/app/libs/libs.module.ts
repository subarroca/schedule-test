import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule
  ]
})
export class LibsModule { }
