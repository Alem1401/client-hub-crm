import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router'; 
import { ClientFormComponent } from './features/client/client-form/client-form.component';
import { RegisterComponent } from "./features/auth/register/register.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { LandingComponent } from "./features/landing/landing.component";
import { InsuranceListComponent } from "./features/policies/policy-list/insurance-list.component";
import { ClientListComponent } from "./features/client/client-list/client-list.component";
import { ConfirmationWindowComponent } from "./features/shared/confirmation-window/confirmation-window.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatButtonModule, MatSidenavModule, ClientFormComponent, RegisterComponent, LoginComponent, LandingComponent, InsuranceListComponent, ClientListComponent, ConfirmationWindowComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ClientHub';
}
