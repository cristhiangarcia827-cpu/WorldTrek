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

  constructor(private paisService: PaisService) {
    this.data.set(paisService.paisSeleccionado());
  }
  
toggleFavorito() {
  const pais = this.data();

  if (pais) {
    this.paisService.toggleFavorito(pais);
  }
  
}

esFavorito(): boolean {
  const pais = this.data();
  return pais ? this.paisService.esFavorito(pais) : false;
}
}