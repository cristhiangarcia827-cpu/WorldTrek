import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';



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

}