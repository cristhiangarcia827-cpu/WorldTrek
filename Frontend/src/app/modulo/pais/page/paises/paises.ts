import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisService } from '../../service/pais';
import { CountryAPIResponse } from '../../modelos/CountryApiResponse';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule],
  templateUrl: './paises.html'
})

export class Paises {

  paisBusqueda = signal<string>("");
  paises = signal<CountryAPIResponse[]>([]);

  constructor(private paisservice: PaisService,private router:Router) {
  }

  buscarPais() {
    const nombre = this.paisBusqueda().trim();
    if (!nombre) return;
    this.paisservice.BuscarPaisPorNombre(this.paisBusqueda()).subscribe(value => this.paises.set(value))
  }

  seleccionarpais(pais: CountryAPIResponse) {
    this.paisservice.SeleccionarPais(pais);
    this.router.navigate(["/principal/paisdetalle"])
  }
}