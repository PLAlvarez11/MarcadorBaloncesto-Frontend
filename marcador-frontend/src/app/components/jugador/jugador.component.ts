import { Component, OnInit } from '@angular/core';
//import { Jugador, JugadorService, JugadorCreateDto } from '../services/jugador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jugador, JugadorCreateDto, JugadorService } from './jugador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  selector: 'app-jugadores',
  templateUrl: './jugador.component.html',
 // styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  jugadores: Jugador[] = [];
  jugadorForm!: FormGroup;
  selectedJugador?: Jugador;
  loading = false;

  constructor(
    private jugadorService: JugadorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadJugadores();
    this.jugadorForm = this.fb.group({
      nombre: ['', Validators.required],
      posicion: ['', Validators.required],
      dorsal: ['', [Validators.required, Validators.min(1)]],
      equipoId: ['', Validators.required]
    });
  }

  loadJugadores(): void {
    this.loading = true;
    this.jugadorService.getAll().subscribe({
      next: (data) => {
        this.jugadores = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  selectJugador(j: Jugador): void {
    this.selectedJugador = j;
    this.jugadorForm.patchValue(j);
  }

  createJugador(): void {
    if (this.jugadorForm.invalid) return;

    const nuevo: JugadorCreateDto = this.jugadorForm.value;
    this.jugadorService.create(nuevo).subscribe({
      next: () => {
        this.loadJugadores();
        this.jugadorForm.reset();
      }
    });
  }

  updateJugador(): void {
    if (!this.selectedJugador || this.jugadorForm.invalid) return;

    this.jugadorService.update(this.selectedJugador.id, this.jugadorForm.value).subscribe({
      next: () => {
        this.loadJugadores();
        this.selectedJugador = undefined;
        this.jugadorForm.reset();
      }
    });
  }

  deleteJugador(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este jugador?')) return;
    this.jugadorService.delete(id).subscribe({
      next: () => this.loadJugadores()
    });
  }

  cancelEdit(): void {
    this.selectedJugador = undefined;
    this.jugadorForm.reset();
  }
}