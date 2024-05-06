import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'myProfile',
    loadComponent: () => import('./features/my-profile/my-profile.component'),
  },
  // {
  //   path: 'favourites',
  //   loadComponent: () => import('./features/favourite/favourite.component'),
  // },
  { path: '**', redirectTo: 'home' },
];
