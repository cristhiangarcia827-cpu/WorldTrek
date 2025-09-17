import { Component, computed, OnInit, signal } from '@angular/core';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';
import { Router } from '@angular/router';
import { CountryAPIResponse } from '../../../pais/modelos/CountryApiResponse';
import { PaisService } from '../../../pais/service/pais';
import { CommonModule } from '@angular/common';
import { Viaje, ViajesService } from '../../../viajes/service/viaje';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styles: [``]
})
export class Dashboard implements OnInit {
  viajes = signal<Viaje[]>([]);

  constructor(
    public authService: AutenticacionService,
    public paisService: PaisService,
    private viajesService: ViajesService,
    private router: Router
  ) { }

  nombreUsuario = computed(() => this.authService.usuarioActual()?.user?.nombre || '');

  ngOnInit(): void {
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.paisService.cargarFavoritos(usuario.user.id);
      this.cargarViajes(usuario.user.id);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/autenticacion/login']);
  }

  verDetalle(pais: CountryAPIResponse) {
    this.paisService.SeleccionarPais(pais);
    this.router.navigate(['/paisdetalle']);
  }

  toggleFavorito(pais: CountryAPIResponse) {
    this.paisService.toggleFavorito(pais);
  }

  cargarViajes(usuarioId: string) {
    this.viajesService.getViajesUsuario(usuarioId).subscribe({
      next: (data: Viaje[]) => {
        this.viajes.set(data.map(v => ({
          ...v,
          fechaInicio: new Date(v.fechaInicio),
          fechaFin: new Date(v.fechaFin)
        })));
      },
      error: (err: any) => console.error('Error al cargar viajes:', err)
    });
  }

  trackByCodigoPais(index: number, pais: any) {
    return pais.codigoPais;
  }

  trackByViajeId(index: number, viaje: Viaje) {
    return viaje.id;
  }
}

