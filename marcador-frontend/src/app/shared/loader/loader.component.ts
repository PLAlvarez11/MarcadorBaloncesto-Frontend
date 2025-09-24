import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],  
  template: `
    <div class="loader-backdrop" *ngIf="loader.loading$ | async">
      <div class="spinner-border text-light" role="status"></div>
    </div>
  `,
  styles: [`
    .loader-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.3);
      display: flex; justify-content: center; align-items: center;
      z-index: 2000;
    }
  `]
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
