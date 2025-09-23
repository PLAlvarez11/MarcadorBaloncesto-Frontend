import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateEquipo, Equipo } from '../models/equipo.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquiposService {
  private base = `${environment.apiUrl}/api/equipos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.base);
  }
  getById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.base}/${id}`);
  }
  create(dto: CreateEquipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.base, dto);
  }
  update(id: number, dto: CreateEquipo) {
    return this.http.put(`${this.base}/${id}`, dto);
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
