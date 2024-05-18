import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged.guard';

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
    canActivate: [loggedGuard],
    loadComponent: () => import('./features/my-profile/my-profile.component'),
  },
  {
    path: 'myProjects',
    title: 'Canline:misProyectos',
    canActivate: [loggedGuard],
    loadComponent: () => import('./features/my-projects/my-projects.component'),
  },
  {
    path: 'projectList',
    title: 'Canline:Proyectos',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./features/project-list/project-list.component'),
  },
  {
    path: 'createProjects',
    title: 'Canline:crearProyectos',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./features/create-project/create-project.component'),
  },
  { path: '**', redirectTo: 'home' },
];
