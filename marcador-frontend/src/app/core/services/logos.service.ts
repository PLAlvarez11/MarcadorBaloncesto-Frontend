import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogosService {
  deleteLogo(equipoId: number) {
      throw new Error('Method not implemented.');
  }
  getLogo(equipoId: number) {
      throw new Error('Method not implemented.');
  }
  uploadLogo(equipoId: number, selectedFile: File) {
      throw new Error('Method not implemented.');
  }
  private base = `${environment.apiUrl}/api/logos`;

  constructor(private http: HttpClient) {}

  upload(equipoId: number, file: File): Observable<any> {
    const form = new FormData();
    form.append('equipoId', String(equipoId));
    form.append('file', file);
    return this.http.post(`${this.base}/upload`, form);
  }

  getLogoUrl(equipoId: number): string {
    return `${this.base}/${equipoId}`;
  }
}
