import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JugadoresService } from '../../../core/services/jugadores.service';
import { EquiposService } from '../../../core/services/equipos.service';
import { Jugador, CreateJugador } from '../../../core/models/jugador.model';
import { Equipo } from '../../../core/models/equipo.model';
import { HasAccessDirective } from '../../../core/auth/has-access.directive';

@Component({
  selector: 'app-jugadores-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, HasAccessDirective],
  templateUrl: './jugadores-list.component.html',
  styleUrls: ['./jugadores-list.component.scss']
})
export class JugadoresListComponent implements OnInit {
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  form: CreateJugador = this.emptyForm();
  editingId: number | null = null;

  constructor(private jugadoresSvc: JugadoresService, private equiposSvc: EquiposService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.jugadoresSvc.getAll().subscribe(res => this.jugadores = res);
    this.equiposSvc.getAll().subscribe(res => this.equipos = res);
  }

  save() {
    if (this.editingId == null) {
      this.jugadoresSvc.create(this.form).subscribe(() => { this.form = this.emptyForm(); this.load(); });
    } else {
      this.jugadoresSvc.update(this.editingId, this.form).subscribe(() => { this.cancel(); this.load(); });
    }
  }

  edit(j: Jugador) {
    this.editingId = j.id;
    this.form = {
      nombre: j.nombre,
      dorsal: j.dorsal,
      posicion: j.posicion,
      estatura: j.estatura,
      edad: j.edad,
      nacionalidad: j.nacionalidad,
      equipoId: j.equipoId
    };
  }

  cancel() {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  remove(id: number) {
    if (!confirm('¿Eliminar jugador?')) return;
    this.jugadoresSvc.delete(id).subscribe(() => this.load());
  }

  private emptyForm(): CreateJugador {
    return { nombre: '', dorsal: 0, posicion: '', estatura: 0, edad: 0, nacionalidad: '', equipoId: 0 };
  }
}
