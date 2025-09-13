import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisService } from '../../service/pais';
import { CountryAPIResponse } from '../../modelos/CountryApiResponse';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-paises',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule],
  templateUrl: './paises.html'
})

export class Paises {

  paisBusqueda = signal<string>("");
  paises = signal<CountryAPIResponse[]>([]);

  constructor(private paisservice: PaisService) {
  }

  buscarPais() {
    this.paisservice.BuscarPaisPorNombre(this.paisBusqueda()).subscribe(value => this.paises.set(value))
  }
}