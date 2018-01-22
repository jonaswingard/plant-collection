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

export const COMPONENTS = [
  PlantListComponent,
  PlantEditComponent,
  NoteEditComponent,
  NoteListComponent,
  ActivityComponent,
  ActivityListComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}
