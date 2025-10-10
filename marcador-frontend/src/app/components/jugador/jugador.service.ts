import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  dorsal: number;
  equipoId: number;
}

export interface JugadorCreateDto {
  nombre: string;
  posicion: string;
  dorsal: number;
  equipoId: number;
}

export interface JugadorUpdateDto {
  nombre: string;
  posicion: string;
  dorsal: number;
  equipoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private baseUrl = 'https://localhost:5001/api/jugadores'; // Cambia el puerto si tu API usa otro

  constructor(private http: HttpClient) {}

  getAll(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.baseUrl);
  }

  getById(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.baseUrl}/${id}`);
  }

  getByEquipo(equipoId: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.baseUrl}/by-equipo/${equipoId}`);
  }

  create(jugador: JugadorCreateDto): Observable<Jugador> {
    return this.http.post<Jugador>(this.baseUrl, jugador);
  }

  update(id: number, jugador: JugadorUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, jugador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}