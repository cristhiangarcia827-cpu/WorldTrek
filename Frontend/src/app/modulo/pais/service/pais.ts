import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { max, Observable } from 'rxjs';
import { CountryAPIResponse } from '../modelos/CountryApiResponse';
import { environment } from '../../../../environments/environment';
import { AutenticacionService } from '../../autenticacion/service/autenticacion';

export interface Favorito {
  id?: string;
  usuarioId: string;
  codigoPais: string;
  fechaAgregado: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  paisSeleccionado = signal<CountryAPIResponse | null>(null);
  paisesFavoritos = signal<Favorito[]>([]);

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
    const existeEnFavoritos = this.esFavorito(pais);

    if (existeEnFavoritos) {
      let paisFavorito = this.paisesFavoritos().find(x => x.codigoPais == pais.cca2);
      this.eliminarFavorito(paisFavorito?.id);
    } else {
      this.guardarFavorito(usuarioId, codigoPais);
    }
  }

  esFavorito(pais: CountryAPIResponse): boolean {
    let existeEnFavoritos = this.paisesFavoritos().find(x => x.codigoPais == pais.cca2);

    if (existeEnFavoritos == undefined) {
      return false;
    } else {
      return true;
    }

  }

  cargarFavoritos(usuarioId: string) {
    this.httpClient.get<Favorito[]>(`${environment.APIURL}/country/favoritos/${usuarioId}`).subscribe(favs => {
      this.paisesFavoritos.set(favs);
    });
  }

  private guardarFavorito(usuarioId: string, codigoPais: string) {
    const favorito: Favorito = { usuarioId, codigoPais, fechaAgregado: new Date() };
    this.httpClient.post<{ id: string }>(`${environment.APIURL}/country/favoritos`, favorito).subscribe(e => this.paisesFavoritos.update(state => [...state, { ...favorito, id: e.id }]));
  }

  private eliminarFavorito(favoritoId?: string) {
    this.httpClient.delete(`${environment.APIURL}/country/favoritos/${favoritoId}`).subscribe(e => {
      let indice = this.paisesFavoritos().findIndex(e => e.id === favoritoId);
      if (indice !== -1) {
        console.log("SE ACTUALIZO DESDE ELIMINAR");
        let copiaFavoritos = [...this.paisesFavoritos()];
        this.paisesFavoritos.set(copiaFavoritos.splice(indice, 1));
      }
    });
  }
}
