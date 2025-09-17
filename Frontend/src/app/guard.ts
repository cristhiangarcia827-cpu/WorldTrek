import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacionService } from './modulo/autenticacion/service/autenticacion';


export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  const usuario = authService.usuarioActual();
  if (usuario) {
    return true;
  }

  router.navigate(['/autenticacion/login']);
  return false;
};
