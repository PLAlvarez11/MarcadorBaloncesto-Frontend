import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { accessGuard } from './core/auth/access.guard'; 

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: '', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'equipos', canActivate: [authGuard], loadComponent: () => import('./features/equipos/equipos-list.component').then(m => m.EquiposListComponent) },
  { path: 'marcador/:id', canActivate: [authGuard], loadComponent: () => import('./features/marcador/marcador.component').then(m => m.MarcadorComponent) },
  { path: 'jugadores', canActivate: [authGuard], loadComponent: () => import('./features/jugadores/jugadores-list/jugadores-list.component').then(m => m.JugadoresListComponent) },
  { path: 'equipos',canActivate: [authGuard, accessGuard],data: { access: 'Equipos.Read' }, loadComponent: () => import('./features/equipos/equipos-list.component').then(m => m.EquiposListComponent)},

  { path: '**', redirectTo: '' }
];
