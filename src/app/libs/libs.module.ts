import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ng2-dnd';
import { ResizableModule } from 'angular-resizable-element';



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
    ResizableModule
    // FlexLayoutModule
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
    // FlexLayoutModule,
    DndModule,
    ResizableModule
  ]
})
export class LibsModule { }
