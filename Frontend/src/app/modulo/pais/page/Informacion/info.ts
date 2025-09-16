import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CountryAPIResponse } from '../../modelos/CountryApiResponse';
import { PaisService } from '../../service/pais';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, DecimalPipe, MatIcon],
  templateUrl: './info.html'
})
export class InfoComponent {
  data = signal<CountryAPIResponse | null>(null);
  esFavorito = signal<boolean>(false);

  constructor(private paisService: PaisService) {
    this.data.set(paisService.paisSeleccionado());
    this.esFavorito.set(this.paisService.esFavorito(paisService.paisSeleccionado()!));
  }

  toggleFavorito() {
    const pais = this.data();

    if (pais) {
      this.paisService.toggleFavorito(pais);
      this.esFavorito.set(this.paisService.esFavorito(pais));
    }

  }
}