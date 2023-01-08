import { Routes } from '@angular/router';
import { MainPageComponent } from '@app/pages/main-page';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainPageComponent },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('@app/pages/card-page').then(mod => mod.CardPageComponent),
  },
];
