import { Component, OnInit } from '@angular/core';
//import { PartidosService } from '../services/partidos.service';
import { HttpErrorResponse } from '@angular/common/http';
//import { PartidosService } from '../../core/services/partidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartidosService } from './partidos.service';

@Component({
imports:[CommonModule,  FormsModule ],
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  //styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  historial: any[] = [];
  mensaje = '';

  constructor(private partidosService: PartidosService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  // 🔹 Cargar el historial de partidos
  cargarHistorial(): void {
    this.partidosService.getHistorial().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar historial', err);
        this.mensaje = 'Error al obtener los partidos';
      }
    });
  }

  // 🔹 Marcar un partido como terminado
  terminarPartido(id: number): void {
    if (confirm('¿Deseas marcar este partido como terminado?')) {
      this.partidosService.terminar(id).subscribe({
        next: () => {
          this.mensaje = 'Partido terminado exitosamente';
          this.cargarHistorial(); // Actualiza la lista
        },
        error: (err: HttpErrorResponse ) => {
          console.error('Error al terminar partido', err);
          this.mensaje = 'Error al terminar el partido';
        }
      });
    }
  }
}