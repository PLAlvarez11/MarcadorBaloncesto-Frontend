import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  template: `
    <app-navbar></app-navbar>
    <app-loader></app-loader>
    <div class="container my-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
