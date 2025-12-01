import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; // ako koristiš mat-button
import { RouterModule } from '@angular/router'; // ako koristiš routerLink
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule,MatButtonModule,MatSidenavModule,ClientFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ClientHub';
}
