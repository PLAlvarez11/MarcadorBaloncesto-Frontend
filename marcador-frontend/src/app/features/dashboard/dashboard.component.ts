import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../core/services/partidos.service';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PartidoHistorial } from '../../core/models/partido.models';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NgFor, DatePipe, RouterLink, AsyncPipe],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  items: PartidoHistorial[] = [];
  loading = true;

  constructor(private partidos: PartidosService) {}

  ngOnInit(): void {
    this.partidos.historial().subscribe({
      next: res => { this.items = res; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
