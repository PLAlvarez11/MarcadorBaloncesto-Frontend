import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Partido {
  id: number;
  equipoLocal: string;
  equipoVisitante: string;
  marcadorLocal: number;
  marcadorVisitante: number;
  estado: string;
}

export interface PartidoCreateDto {
  equipoLocalId: number;
  equipoVisitanteId: number;
  marcadorLocal: number;
  marcadorVisitante: number;
}

export interface PartidoUpdateDto {
  marcadorLocal: number;
  marcadorVisitante: number;
}

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private apiUrl = 'http://localhost:5066/api/partidos';

  constructor(private http: HttpClient) { }

  // Obtener historial completo
  getHistorial(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/historial`);
  }

  // Terminar un partido
  terminar(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/terminar`, {});
  }

  // Obtener partido por ID
  getById(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.apiUrl}/${id}`);
  }

  // Crear un partido
  create(dto: PartidoCreateDto): Observable<Partido> {
    return this.http.post<Partido>(this.apiUrl, dto);
  }

  // Actualizar marcador de un partido
  updateMarcador(id: number, dto: PartidoUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/marcador`, dto);
  }
}