import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { max, Observable } from 'rxjs';
import { CountryAPIResponse } from '../modelos/CountryApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  paisSeleccionado = signal<CountryAPIResponse | null>(null);

  constructor(private httpClient: HttpClient) {

  }

  BuscarPaisPorNombre(nombre: string): Observable<CountryAPIResponse[]> {
    return this.httpClient.get<CountryAPIResponse[]>(`${environment.APIURL}/country/${nombre}`)
  }

  SeleccionarPais(pais: CountryAPIResponse) {
    this.paisSeleccionado.set(pais);
  }
}
