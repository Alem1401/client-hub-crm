import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; // ako koristiš mat-button
import { RouterModule } from '@angular/router'; // ako koristiš routerLink



@Component({
  selector: 'app-root',
  imports: [RouterModule,MatButtonModule,MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ClientHub';
}
