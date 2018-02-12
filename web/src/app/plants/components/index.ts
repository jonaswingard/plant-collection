import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlantListComponent } from './plant-list';
import { PlantEditComponent } from './plant-edit';
import { NoteEditComponent } from './note-edit';
import { NoteListComponent } from './note-list';
import { ActivityComponent } from './activity';
import { ActivityListComponent } from './activity-list';
import { UploadImageComponent } from './upload-image';
import { MaterialModule } from '../../shared/material.module';

export const COMPONENTS = [
  PlantListComponent,
  PlantEditComponent,
  NoteEditComponent,
  NoteListComponent,
  ActivityComponent,
  ActivityListComponent,
  UploadImageComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
