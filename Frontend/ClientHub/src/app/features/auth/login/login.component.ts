import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { GlobalService } from '../../../services/global-service';
import { loginAgentDto } from '../../../dtos/agent/login-agent.dto';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  router = inject(Router);
  hidePassword = true;
  loginFailed = false;
  authService = inject(AuthService);
  globalService = inject(GlobalService);
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { validators: Validators.required }),
    rememberMe: new FormControl(false)
  });

  login() {
    this.loginFailed = false;
    if (this.loginForm.valid) {
      const loginDto: loginAgentDto = {
        email: this.loginForm.controls.email.value || '',
        password: this.loginForm.controls.password.value || ''
      };
      this.authService.loginUser(loginDto).subscribe({
        next: (response: responseAgentDto) => {
          
          this.globalService.setCurrentUser(response);
          console.log(response)
          this.router.navigate(["dashboard"])
         
        },
        error: (_err: any) => {
          this.loginFailed = true;
        
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
