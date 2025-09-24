import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const accessGuard = (requiredAccess: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.hasAccess(requiredAccess)) {
      return true;
    }

    // si no tiene acceso, redirigimos
    router.navigate(['/']);
    return false;
  };
};
