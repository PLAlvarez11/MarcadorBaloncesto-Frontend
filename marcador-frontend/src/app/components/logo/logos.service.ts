import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogosService {
  private apiUrl = 'http://localhost:5066/api/logos'; // Cambia el puerto si tu backend usa otro

  constructor(private http: HttpClient) { }

  getLogo(equipoId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${equipoId}`, {
      responseType: 'blob'
    });
  }

  uploadLogo(equipoId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('EquipoId', equipoId.toString());
    formData.append('File', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  deleteLogo(equipoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${equipoId}`);
  }
}