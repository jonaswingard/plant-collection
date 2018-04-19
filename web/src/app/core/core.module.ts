import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppPageComponent } from './components/app';
import { NotFoundPageComponent } from './components/not-found-page';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

export const COMPONENTS = [AppPageComponent, NotFoundPageComponent];

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, AuthModule],
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
