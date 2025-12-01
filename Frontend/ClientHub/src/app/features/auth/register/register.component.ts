import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { registerAgentDto } from '../../../dtos/agent/register-agent.dto';
import { delay } from 'rxjs';
@Component({
  selector: 'app-register',
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
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  userExists = false;
  passwordMismatch = false;
  authService = inject(AuthService);
  registrationForm = new FormGroup({
    firstName: new FormControl('', { validators: Validators.required }),
    lastName: new FormControl('', { validators: Validators.required }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { validators: Validators.required }),
    confirmPassword: new FormControl('', { validators: Validators.required }),
  });

  register() {
    this.userExists = false;
    this.passwordMismatch = false;
    if (this.registrationForm.valid) {
      const password = this.registrationForm.controls.password.value;
      const confirmPassword =
        this.registrationForm.controls.confirmPassword.value;
      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return;
      }
      const email = this.registrationForm.controls.email.value || '';

      this.authService.userExists(email).subscribe({
        next: (response) => {
          if (!response) {
            this.createUser();
          } else {
            this.userExists = true;
            console.log('User already exists');
          }
        },
        error: (err) => {
          console.error('Error checking user existence', err);
        },
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  createUser() {
    const toRegister: registerAgentDto = {
      firstName: this.registrationForm.controls.firstName.value || '',
      lastName: this.registrationForm.controls.lastName.value || '',
      email: this.registrationForm.controls.email.value || '',
      password: this.registrationForm.controls.password.value || '',
    };
    console.log(toRegister);
    this.authService.registerUser(toRegister).subscribe({
      next: (response) => console.log('User registered successfully'),
      error: (err) => console.error('Registration failed', err),
    });
  }
}
