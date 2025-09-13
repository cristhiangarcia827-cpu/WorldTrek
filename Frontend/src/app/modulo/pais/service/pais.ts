import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { max, Observable } from 'rxjs';
import { CountryAPIResponse } from '../modelos/CountryApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  constructor(private httpClient: HttpClient) {

  }

  BuscarPaisPorNombre(nombre: string): Observable<CountryAPIResponse[]> {
    return this.httpClient.get<CountryAPIResponse[]>(`${environment.APIURL}/country/${nombre}`)
  }
}
