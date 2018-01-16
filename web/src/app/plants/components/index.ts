import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlantListComponent } from './plant-list';
import { PlantEditComponent } from './plant-edit';

export const COMPONENTS = [PlantListComponent, PlantEditComponent];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}