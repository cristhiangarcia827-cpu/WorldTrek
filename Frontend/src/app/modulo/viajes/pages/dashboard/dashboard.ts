import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../service/viaje';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  resumen: any;

  constructor(private viajesService: ViajesService) { }

  ngOnInit(): void {
    this.viajesService.getResumenViajes().subscribe({
      next: (data) => this.resumen = data,
      error: (err) => console.error('Error al cargar resumen:', err)
    });
  }
}
