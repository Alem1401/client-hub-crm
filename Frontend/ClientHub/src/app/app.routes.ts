import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout.component';
import { ClientListComponent } from './features/client/client-list/client-list.component';
import { ClientFormComponent } from './features/client/client-form/client-form.component';
import { InsuranceListComponent } from './features/policies/policy-list/insurance-list.component';

export const routes: Routes = [
{path : "register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:"",component:LandingComponent},
{
  path: "dashboard",
  component: DashboardLayoutComponent,
  children: [
  {
    path: "clients",
    children: [
      { path: "", component: ClientListComponent },     
      { path: "form", component: ClientFormComponent },
       { path: "form/:id", component: ClientFormComponent }
     
    ]
  
  },
  {path:"insurances",
    children:[
      {path:"",component:InsuranceListComponent} 
    ]
  }
]
}

];
