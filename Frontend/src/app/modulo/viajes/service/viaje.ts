import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../autenticacion/service/autenticacion';
import { environment } from '../../../../environments/environment.development';

export interface Viaje {
  id?: string;
  usuarioId: string;
  titulo: string;
  paisDestino: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  descripcion: string;
}

export interface Usuario {
  usuarioId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  viajes = signal<Viaje[]>([]);

  constructor(private http: HttpClient, private authService: AutenticacionService) {
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.cargarViajes();
    }
  }

  cargarViajes(): void {
    if (!this.authService.usuarioActual()) return;

    this.getViajesUsuario(this.authService.usuarioActual()?.user.id!).subscribe({
      next: (data) => this.viajes.set(data),
      error: (err: any) => console.error('Error al cargar viajes:', err)
    });
  }

  getViajesUsuario(usuarioId: string, estado?: 'Planificado' | 'Completado'): Observable<Viaje[]> {
    let url = `${environment.APIURL}/trips/user/${usuarioId}`;
    if (estado) url += `?estado=${estado}`;
    return this.http.get<Viaje[]>(url);
  }

  crearViaje(viaje: Viaje): void {
    if (!this.authService.usuarioActual()) {
      alert('Debes iniciar sesión para crear un viaje');
      return;
    }
    viaje.usuarioId = this.authService.usuarioActual()?.user.id!;

    this.http.post<{ id: string; mensaje: string }>(`${environment.APIURL}/trips`, viaje).subscribe({
      next: (res) => {
        viaje.id = res.id;
        this.viajes.update(lista => [...lista, viaje]);
        alert('Viaje creado correctamente');
      },
      error: (err: any) => console.error('Error al crear viaje:', err)
    });
  }

  actualizarViaje(viajeId: string, viaje: Viaje): void {
    this.http.put<{ mensaje: string }>(`${environment.APIURL}/trips/${viajeId}`, viaje).subscribe({
      next: () => {
        this.viajes.update(lista =>
          lista.map(v => (v.id === viajeId ? { ...v, ...viaje } : v))
        );
        alert('Viaje actualizado correctamente');
      },
      error: (err: any) => console.error('Error al actualizar viaje:', err)
    });
  }

  eliminarViaje(viajeId: string): void {
    this.http.delete<{ mensaje: string }>(`${environment.APIURL}/trips/${viajeId}`).subscribe({
      next: () => {
        this.viajes.update(lista => lista.filter(v => v.id !== viajeId));
        alert('Viaje eliminado correctamente');
      },
      error: (err: any) => console.error('Error al eliminar viaje:', err)
    });
  }

  esViajeExistente(viajeId: string): boolean {
    return this.viajes().some(v => v.id === viajeId);
  }
}
