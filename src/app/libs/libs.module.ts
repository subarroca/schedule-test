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
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
} from '@angular/material';
import {
  ResizableModule,
} from 'angular-resizable-element';
import { DndModule } from 'ng2-dnd';
import { ClipboardModule } from 'ngx-clipboard';

// import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    DndModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    ResizableModule,
    ClipboardModule
  ],
  declarations: [],
  exports: [
    DndModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    ResizableModule,
    ClipboardModule,
  ]
})
export class LibsModule { }
