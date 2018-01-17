import { StoreModule } from '@ngrx/store';
import { CollectionPageComponent } from './containers/collection-page';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './store/effects/collection';
import { PlantEffects } from './store/effects/plant';
import { PlantsService } from './services/plants.service';
import { ComponentsModule } from './components';
import { PlantPageComponent } from './containers/plant-page';
import { PlantExistsGuard } from './guards/plant-exists';

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
    EffectsModule.forFeature([CollectionEffects, PlantEffects])
  ],
  declarations: [CollectionPageComponent, PlantPageComponent],
  providers: [PlantsService, PlantExistsGuard]
})
export class PlantsModule {}
