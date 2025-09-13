import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CountryAPIResponse } from '../../modelos/CountryApiResponse';
import { PaisService } from '../../service/pais';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, DecimalPipe],
  templateUrl: './info.html'
})
export class InfoComponent {
  data = signal<CountryAPIResponse | null>(null);

  constructor(private paisService: PaisService) {
    this.data.set(paisService.paisSeleccionado());
  }
}