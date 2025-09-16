import { Component, computed } from '@angular/core';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';
import { Router } from '@angular/router';
import { CountryAPIResponse } from '../../../pais/modelos/CountryApiResponse';
import { PaisService } from '../../../pais/service/pais';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styles: ``,
  imports: [MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatIcon, MatCard]
})
export class Dashboard {
  constructor(
    public authService: AutenticacionService,
    public paisService: PaisService,
    private router: Router
  ) {
    // Cargar favoritos al iniciar el dashboard si hay usuario
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.paisService.cargarFavoritos(usuario.user.id);
    }
  }

  nombreUsuario = computed(() => this.authService.usuarioActual()?.user?.nombre || '');

  logout() {
    this.authService.logout();
    this.router.navigate(['/autenticacion/login']);
  }

  verDetalle(pais: CountryAPIResponse) {
    this.paisService.SeleccionarPais(pais);
    this.router.navigate(['/principal/paisdetalle']);
  }

  toggleFavorito(pais: CountryAPIResponse) {
    this.paisService.toggleFavorito(pais);
  }
}
