import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout.component';

export const routes: Routes = [
{path : "register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:"",component:LandingComponent},
{path:"dashboard",component:DashboardLayoutComponent}
];
