import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';



@Component({
  selector: 'app-principallayout',
  templateUrl: './principallayout.html',
  styles: `
  .example-spacer {
    flex: 1 1 auto;
  }

  .link{
    text-decoration:none;
    font-size:1rem;
  }
`,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterOutlet, RouterLink]
})
export class Principallayout {
   constructor(public authService: AutenticacionService, private router: Router) {}
   
  nombreUsuario = computed(() => this.authService.usuarioActual()?.user?.nombre || '');

  logout() {
    this.authService.logout();
    this.router.navigate(['/autenticacion/login']);
  }
}