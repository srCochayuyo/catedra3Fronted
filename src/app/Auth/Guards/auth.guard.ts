import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../Service/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);
  
  const token = localStorage.getVariable('token');
  
  if (!token) {
    // Si no hay token, redirigir a login
    router.navigate(['/'], {
      queryParams: { message: 'Debe iniciar sesión' }
    });
    return false;
  }
  
  return true;
};
