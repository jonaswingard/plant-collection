import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppPageComponent } from './components/app';
import { NotFoundPageComponent } from './components/not-found-page';

export const COMPONENTS = [AppPageComponent, NotFoundPageComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
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
