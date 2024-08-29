import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUserValue;
  if (user) {
    // User is logged in, so return true
    return true;
  }

  // Not logged in, so redirect to login page with the return URL
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;

};

