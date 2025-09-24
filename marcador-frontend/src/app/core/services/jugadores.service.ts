import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Jugador, CreateJugador } from '../models/jugador.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JugadoresService {
  private base = `${environment.apiUrl}/api/jugadores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.base);
  }

  getById(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.base}/${id}`);
  }

  create(dto: CreateJugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.base, dto);
  }

  update(id: number, dto: CreateJugador) {
    return this.http.put(`${this.base}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
