import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router'; 
import { ClientFormComponent } from './features/client/client-form/client-form.component';
import { RegisterComponent } from "./features/auth/register/register.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { LandingComponent } from "./features/landing/landing.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatButtonModule, MatSidenavModule, ClientFormComponent, RegisterComponent, LoginComponent, LandingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ClientHub';
}
