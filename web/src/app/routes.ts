import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/components/not-found-page';
import { AppPageComponent } from './core/components/app';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppPageComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];
