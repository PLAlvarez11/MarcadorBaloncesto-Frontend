import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PartidoDto, PartidoHistorial } from '../models/partido.models';

@Injectable({ providedIn: 'root' })
export class PartidosService {
  private base = `${environment.apiUrl}/api/partidos`;
  private marcador = `${environment.apiUrl}/api/marcador`;

  constructor(private http: HttpClient) {}

  historial(): Observable<PartidoHistorial[]> {
    return this.http.get<PartidoHistorial[]>(`${this.base}/historial`);
  }

  getMarcador(id: number): Observable<PartidoDto> {
    return this.http.get<PartidoDto>(`${this.marcador}/${id}`);
  }

  sumarPuntos(id: number, equipo: 1|2, puntos: 1|2|3) {
    return this.http.post(`${this.marcador}/${id}/puntos?equipo=${equipo}&puntos=${puntos}`, {});
  }
  restarPuntos(id: number, equipo: 1|2, puntos: 1|2|3) {
    return this.http.post(`${this.marcador}/${id}/restar?equipo=${equipo}&puntos=${puntos}`, {});
  }
  falta(id: number, equipo: 1|2) {
    return this.http.post(`${this.marcador}/${id}/falta?equipo=${equipo}`, {});
  }
  avanzarCuarto(id: number) {
    return this.http.post(`${this.marcador}/${id}/cuarto`, {});
  }
  reiniciar(id: number) {
    return this.http.post(`${this.marcador}/${id}/reiniciar`, {});
  }
  terminarPartido(id: number) {
    return this.http.put(`${this.base}/${id}/terminar`, {});
  }
}
