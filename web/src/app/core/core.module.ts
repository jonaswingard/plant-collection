import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppPageComponent } from './components/app';
import { NotFoundPageComponent } from './components/not-found-page';
import { SharedModule } from '../shared/shared.module';

export const COMPONENTS = [AppPageComponent, NotFoundPageComponent];

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}
