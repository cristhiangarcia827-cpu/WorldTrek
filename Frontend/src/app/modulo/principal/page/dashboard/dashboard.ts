import { Component, computed } from '@angular/core';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styles: ``,
  imports: []
})
export class Dashboard {
  constructor(public authService: AutenticacionService, private router: Router) {}
   
  nombreUsuario = computed(() => this.authService.usuarioActual()?.user?.nombre || '');

  logout() {
    this.authService.logout();
    this.router.navigate(['/autenticacion/login']);
  }
}
