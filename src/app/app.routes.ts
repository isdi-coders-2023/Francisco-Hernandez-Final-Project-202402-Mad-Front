import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    title: 'Canline:home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'myProfile',
    title: 'Canline:miPerfil',
    loadComponent: () => import('./features/my-profile/my-profile.component'),
  },
  {
    path: 'myProjects',
    title: 'Canline:misProyectos',
    loadComponent: () => import('./features/my-projects/my-projects.component'),
  },
  {
    path: 'createProjects',
    title: 'Canline:crearProyectos',
    loadComponent: () =>
      import('./features/create-project/create-project.component'),
  },
  { path: '**', redirectTo: 'home' },
];
