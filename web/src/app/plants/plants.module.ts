import { ActivityEffects } from './store/effects/activity';
import { ActivitiesService } from './services/activities.service';
import { CollectionEffects } from './store/effects/collection';
import { CollectionPageComponent } from './containers/collection-page';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NoteEffects } from './store/effects/note';
import { NotesService } from './services/notes.service';
import { PlantEffects } from './store/effects/plant';
import { PlantExistsGuard } from './guards/plant-exists';
import { PlantPageComponent } from './containers/plant-page';
import { PlantsService } from './services/plants.service';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: CollectionPageComponent },
      {
        path: ':id',
        component: PlantPageComponent,
        canActivate: [PlantExistsGuard]
      }
    ]),
    StoreModule.forFeature('plants', reducers),
    EffectsModule.forFeature([
      CollectionEffects,
      PlantEffects,
      NoteEffects,
      ActivityEffects
    ]),
    MaterialModule
  ],
  declarations: [CollectionPageComponent, PlantPageComponent],
  providers: [PlantsService, PlantExistsGuard, NotesService, ActivitiesService]
})
export class PlantsModule {}
