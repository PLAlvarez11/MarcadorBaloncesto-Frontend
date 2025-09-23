import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: '', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'equipos', canActivate: [authGuard], loadComponent: () => import('./features/equipos/equipos-list.component').then(m => m.EquiposListComponent) },
  { path: 'marcador/:id', canActivate: [authGuard], loadComponent: () => import('./features/marcador/marcador.component').then(m => m.MarcadorComponent) },
  { path: '**', redirectTo: '' }
];
