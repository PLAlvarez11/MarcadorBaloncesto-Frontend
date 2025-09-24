import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidosService } from '../../core/services/partidos.service';
import { PartidoDto } from '../../core/models/partido.models';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-marcador',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss']
})
export class MarcadorComponent implements OnInit, OnDestroy {
  id!: number;
  data?: PartidoDto;
  polling?: Subscription;

  constructor(private route: ActivatedRoute, private svc: PartidosService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.refresh();
    // Polling simple cada 3s (puedes cambiar a SignalR más adelante)
    this.polling = interval(3000).subscribe(() => this.refresh());
  }

  ngOnDestroy(): void {
    this.polling?.unsubscribe();
  }

  refresh() {
    this.svc.getMarcador(this.id).subscribe(res => this.data = res);
  }

  add(equipo: 1|2, puntos: 1|2|3) {
    this.svc.sumarPuntos(this.id, equipo, puntos).subscribe(() => this.refresh());
  }
  sub(equipo: 1|2, puntos: 1|2|3) {
    this.svc.restarPuntos(this.id, equipo, puntos).subscribe(() => this.refresh());
  }
  falta(equipo: 1|2) {
    this.svc.falta(this.id, equipo).subscribe(() => this.refresh());
  }
  cuarto() {
    this.svc.avanzarCuarto(this.id).subscribe(() => this.refresh());
  }
  reiniciar() {
    if (!confirm('¿Reiniciar marcador?')) return;
    this.svc.reiniciar(this.id).subscribe(() => this.refresh());
  }
  terminar() {
    if (!confirm('¿Terminar partido?')) return;
    this.svc.terminarPartido(this.id).subscribe(() => this.refresh());
  }
}
