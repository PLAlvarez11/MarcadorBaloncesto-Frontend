import { Component, OnInit } from '@angular/core';
// import { EquiposService } from '../services/equipos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EquiposService } from './equipos.service';
import { Equipo } from '../../core/models/equipo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { Equipo } from '../models/equipo.model'; 

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  //styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos: any[] = [];
  nuevoEquipo = { nombre: '' };
  mensaje = '';

  constructor(private equiposService: EquiposService) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.equiposService.getAll().subscribe({
      next: (data: Equipo[]) => this.equipos = data,
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.mensaje = 'Error al obtener los equipos';
      }
    });
  }

  crearEquipo() {
    if (!this.nuevoEquipo.nombre.trim()) return;
    this.equiposService.create(this.nuevoEquipo).subscribe({
      next: () => {
        this.mensaje = 'Equipo creado exitosamente';
        this.nuevoEquipo.nombre = '';
        this.cargarEquipos();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.mensaje = 'Error al crear equipo';
      }
    });
  }

  actualizarEquipo(equipo: any) {
    this.equiposService.update(equipo.id, equipo).subscribe({
      next: () => this.mensaje = 'Equipo actualizado correctamente',
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.mensaje = 'Error al actualizar equipo';
      }
    });
  }

  eliminarEquipo(id: number) {
    if (confirm('¿Seguro que deseas eliminar este equipo?')) {
      this.equiposService.delete(id).subscribe({
        next: () => {
          this.mensaje = 'Equipo eliminado';
          this.cargarEquipos();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.mensaje = 'Error al eliminar equipo';
        }
      });
    }
  }
}