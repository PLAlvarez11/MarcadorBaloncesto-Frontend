import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

const AUTH_URLS = ['/auth/login', '/auth/refresh', '/auth/logout'];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isAuthCall = AUTH_URLS.some(u => req.url.includes(u));
  const token = auth.accessToken;

  const authReq = token && !isAuthCall
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` }})
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthCall && auth.refreshToken) {
        return auth.refresh().pipe(
          switchMap(() => {
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${auth.accessToken}` }
            });
            return next(newReq);
          }),
          catchError(e => {
            auth.clearAuth();
            return throwError(() => e);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
