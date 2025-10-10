import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5066/auth'; // base del backend

  constructor(private http: HttpClient) {}

  // ---- LOGIN ----
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // ---- REFRESH TOKEN ----
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken });
  }

  // ---- LOGOUT ----
  logout(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { refreshToken });
  }

  // ---- USUARIO ACTUAL ----
  me(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }
}
