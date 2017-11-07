import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FlexLayoutModule,
} from '@angular/flex-layout';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import {
  ResizableModule,
} from 'angular-resizable-element';
import { DndModule } from 'ng2-dnd';

// import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    DndModule,
    ResizableModule,
    FlexLayoutModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    DndModule,
    ResizableModule
  ]
})
export class LibsModule { }
