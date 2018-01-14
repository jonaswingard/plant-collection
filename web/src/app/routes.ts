import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/components/not-found-page';
import { AppPageComponent } from './core/components/app';

export const routes: Routes = [
  { path: '', redirectTo: '/plants', pathMatch: 'full' },
  {
    path: 'plants',
    loadChildren: './plants/plants.module#PlantsModule'
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];
