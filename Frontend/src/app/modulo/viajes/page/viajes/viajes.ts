import { Component, OnInit, signal } from '@angular/core';
import { ViajesService, Viaje } from '../../service/viaje';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';
import { CommonModule } from '@angular/common';
import { NuevoViaje } from '../../componente/nuevoviaje/nuevoviaje';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.html',
  standalone: true,
  imports: [CommonModule, NuevoViaje],
})
export class Viajes implements OnInit {
  viajesOriginales = signal<Viaje[]>([]);
  viajes = signal<Viaje[]>([]);
  usuarioId: string = '';
  filtroEstado: 'Planificado' | 'Completado' | 'Todo' = "Todo";

  viajeSeleccionado?: Viaje;
  mostrarFormulario: boolean = false;

  constructor(
    private viajesService: ViajesService,
    private authService: AutenticacionService
  ) { }

  ngOnInit(): void {
    const usuario = this.authService.usuarioActual();
    if (usuario) this.usuarioId = usuario.user.id;
    this.cargarViajes();
  }

  cargarViajes(): void {
    if (!this.usuarioId) return;

    const estadoFiltro = this.filtroEstado !== 'Todo' ? this.filtroEstado : undefined;

    this.viajesService.getViajesUsuario(this.usuarioId, estadoFiltro)
      .subscribe({
        next: (data: Viaje[]) => {
          this.viajes.set(data.map(v => ({
            ...v,
            fechaInicio: new Date(v.fechaInicio),
            fechaFin: new Date(v.fechaFin)
          })));

          this.viajesOriginales.set(data.map(v => ({
            ...v,
            fechaInicio: new Date(v.fechaInicio),
            fechaFin: new Date(v.fechaFin)
          })));
        },
        error: (err: any) => alert(`Error al cargar viajes: ${err.message}`)
      });
  }

  aplicarFiltro(estado: 'Planificado' | 'Completado' | 'Todo'): void {
    this.filtroEstado = estado;

    if (estado === "Todo") {
      this.viajes.set(this.viajesOriginales())
    } else {
      this.viajes.set(this.viajesOriginales().filter(x => x.estado === estado))
    }
  }

  eliminarViaje(viajeId: string): void {
    if (!confirm('¿Deseas eliminar este viaje?')) return;

    this.viajesService.eliminarViaje(viajeId);
    this.viajes.set(this.viajesService.viajes());
  }

  nuevoViaje(): void {
    this.viajeSeleccionado = undefined;
    this.mostrarFormulario = true;
  }

  editarViaje(viaje: Viaje): void {
    this.viajeSeleccionado = viaje;
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.viajeSeleccionado = undefined;
    this.cargarViajes();
  }
}




