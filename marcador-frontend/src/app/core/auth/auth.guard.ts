import { CanActivateFn, Router } from '@angular/router';
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
