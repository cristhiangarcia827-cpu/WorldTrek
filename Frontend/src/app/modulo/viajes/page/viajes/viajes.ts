import { Component, OnInit } from '@angular/core';
import { ViajesService, Viaje } from '../../service/viaje';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.html',
  standalone: true, // <- componente standalone
  imports: [CommonModule], // <- importante para pipes y directivas
})
export class Viajes implements OnInit { 
  viajes: Viaje[] = [];
  usuarioId: string = '';
  filtroEstado: 'Planificado' | 'Completado' | '' = '';

  constructor(
    private viajesService: ViajesService,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.usuarioActual();
    if (usuario) this.usuarioId = usuario.user.id;
    this.cargarViajes();
  }

  cargarViajes(): void {
    if (!this.usuarioId) return;

    this.viajesService.getViajesUsuario(this.usuarioId, this.filtroEstado || undefined)
      .subscribe({
        next: (data: Viaje[]) => {
          this.viajes = data.map(v => ({
            ...v,
            fechaInicio: new Date(v.fechaInicio),
            fechaFin: new Date(v.fechaFin)
          }));
        },
        error: (err: any) => alert(`Error al cargar viajes: ${err.message}`)
      });
  }

  aplicarFiltro(estado: 'Planificado' | 'Completado' | ''): void {
    this.filtroEstado = estado;
    this.cargarViajes();
  }

  eliminarViaje(viajeId: string): void {
    if (!confirm('¿Deseas eliminar este viaje?')) return;

    this.viajesService.eliminarViaje(viajeId);
    this.viajes = this.viajesService.viajes();
  }
}




