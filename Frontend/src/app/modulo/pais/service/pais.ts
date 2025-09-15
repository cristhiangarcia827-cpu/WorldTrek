import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { max, Observable } from 'rxjs';
import { CountryAPIResponse } from '../modelos/CountryApiResponse';
import { environment } from '../../../../environments/environment';
import { AutenticacionService } from '../../autenticacion/service/autenticacion';

export interface Favorito {
  usuarioId: string;
  codigoPais: string;
  fechaAgregado: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  paisSeleccionado = signal<CountryAPIResponse | null>(null);
  favoritos = signal<Set<string>>(new Set());

  constructor(private httpClient: HttpClient, private authService: AutenticacionService) {
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.cargarFavoritos(usuario.user.id);
    }
  }

  BuscarPaisPorNombre(nombre: string): Observable<CountryAPIResponse[]> {
    return this.httpClient.get<CountryAPIResponse[]>(`${environment.APIURL}/country/${nombre}`)
  }

  SeleccionarPais(pais: CountryAPIResponse) {
    this.paisSeleccionado.set(pais);
  }

  toggleFavorito(pais: CountryAPIResponse) {
    const usuario = this.authService.usuarioActual();
    if (!usuario) {
      alert('Debes iniciar sesión para marcar favoritos');
      return;
    }

    const usuarioId = usuario.user.id;
    const codigoPais = pais.cca2;
    const set = new Set(this.favoritos());

    if (set.has(codigoPais)) {
      set.delete(codigoPais);
      this.eliminarFavorito(usuarioId, codigoPais);
    } else {
      set.add(codigoPais);
      this.guardarFavorito(usuarioId, codigoPais);
    }

    this.favoritos.set(set);
  }

  esFavorito(pais: CountryAPIResponse): boolean {
    return this.favoritos().has(pais.cca2);
  }

  cargarFavoritos(usuarioId: string) {
    this.httpClient.get<Favorito[]>(`${environment.APIURL}/country/favoritos/${usuarioId}`).subscribe(favs => {
      const set = new Set(favs.map(f => f.codigoPais));
      this.favoritos.set(set);
    });
  }
  private guardarFavorito(usuarioId: string, codigoPais: string) {
    const favorito: Favorito = { usuarioId, codigoPais, fechaAgregado: new Date() };
    this.httpClient.post(`${environment.APIURL}/country/favoritos`, favorito).subscribe();
  }

  private eliminarFavorito(usuarioId: string, codigoPais: string) {
    this.httpClient.delete(`${environment.APIURL}/country/favoritos/${usuarioId}/${codigoPais}`).subscribe();
  }
}
