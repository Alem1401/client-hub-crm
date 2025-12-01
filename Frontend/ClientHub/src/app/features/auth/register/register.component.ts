import { Component } from '@angular/core';
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
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  registrationForm = new FormGroup({
    firstName : new FormControl("",{validators:Validators.required}),
    lastName : new FormControl("",{validators:Validators.required}),
    email : new FormControl("",{validators:[Validators.required,Validators.email]}),
    password : new FormControl("",{validators: Validators.required}),
    confirmPassword : new FormControl("",{validators: Validators.required}),  
    phone: new FormControl("",{validators:Validators.required})
 
  })
  
  register(){
    if (this.registrationForm.valid){
        
    }
  }

}
