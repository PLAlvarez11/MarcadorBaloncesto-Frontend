import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.accessToken;
  if (token) return true;

  return auth.me.pipe(
    map(me => {
      if (me) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};

export const accessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredAccess = route.data['access'] as string;

  if (requiredAccess && auth.hasAccess(requiredAccess)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};