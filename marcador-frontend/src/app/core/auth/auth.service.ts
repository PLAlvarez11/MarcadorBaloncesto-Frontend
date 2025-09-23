import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, MeResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;
  private me$ = new BehaviorSubject<MeResponse | null>(null);

  constructor(private http: HttpClient) {}

  get me(): Observable<MeResponse | null> {
    return this.me$.asObservable();
  }

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  get refreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, payload).pipe(
      tap(res => this.persistAuth(res)),
      tap(() => this.fetchMe().subscribe())
    );
  }

  fetchMe(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.base}/auth/me`).pipe(
      tap(u => this.me$.next(u))
    );
  }

  refresh(): Observable<AuthResponse> {
    const token = this.refreshToken;
    return this.http.post<AuthResponse>(`${this.base}/auth/refresh`, { refreshToken: token }).pipe(
      tap(res => this.persistAuth(res))
    );
  }

  logout(): Observable<any> {
    const token = this.refreshToken;
    return this.http.post(`${this.base}/auth/logout`, { refreshToken: token }).pipe(
      tap(() => this.clearAuth())
    );
  }

  private persistAuth(res: AuthResponse) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  }

  clearAuth() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.me$.next(null);
  }
}
