import { StoreModule } from '@ngrx/store';
import { CollectionPageComponent } from './containers/collection-page';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './store/effects/collection';
import { PlantsService } from './services/plants.service';

// import { ComponentsModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    // ComponentsModule,
    RouterModule.forChild([{ path: '', component: CollectionPageComponent }]),
    StoreModule.forFeature('plants', reducers),
    EffectsModule.forFeature([CollectionEffects])
  ],
  declarations: [CollectionPageComponent],
  providers: [PlantsService]
})
export class PlantsModule {}
