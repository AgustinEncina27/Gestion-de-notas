import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
 
export const authGuard: CanActivateFn = (route, state) => {
 
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isAuthenticated()) {
    if (authService.isTokenExpirado()) {
      authService.logOut();
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
  router.navigate(['/login']);
  return false;
};
