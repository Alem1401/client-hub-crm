import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { createUpdateClientDto } from '../../../dtos/client/create-update-client.dto';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../services/global-service';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client-service';
import { ResponseClientDto } from '../../../dtos/client/response-client.dto';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm = new FormGroup({
    firstName: new FormControl('', { validators: Validators.required }),
    lastName: new FormControl('', { validators: Validators.required }),
    email: new FormControl('', { validators: [Validators.email] }),
    phoneNumber: new FormControl('', {}),
    address: new FormControl('', {}),
    city: new FormControl('', { validators: Validators.required }),
    dateOfBirth: new FormControl(null, { validators: Validators.required }),
    status: new FormControl('Active', { validators: Validators.required }),
    lastContactDate: new FormControl(null, {}),
    notes: new FormControl('', {}),
  });

  currentAgent: responseAgentDto | null = null;
  ngOnInit(): void {
    this.globalService.currentUser$.subscribe({
      next: (data) => (this.currentAgent = data),
    });
    
    // Check if we're in view mode
    const url = this.route.snapshot.url;
    if (url.length > 0 && url[0].path === 'view') {
      this.viewMode = true;
    }
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientId = Number(id);
      this.editMode = true;
      this.populateForm();
    }
  }

  editMode: boolean = false;
  viewMode: boolean = false;

  clientId: number | null = null;
  clientService = inject(ClientService);
  private _originalClient: ResponseClientDto | null = null;
  route = inject(ActivatedRoute);
  globalService = inject(GlobalService);
  router = inject(Router);
  populateForm() {
    if (!this.clientId) return;
    this.clientService.getClientById(this.clientId).subscribe({
      next: (resp) => this.patchForm(resp as ResponseClientDto),
      error: (err) => console.error('Failed to load client', err),
    });
  }

  patchForm(response: ResponseClientDto) {
    this._originalClient = response;
    this.clientForm.patchValue({
      firstName: response.firstName ?? '',
      lastName: response.lastName ?? '',
      email: response.email ?? '',
      phoneNumber: response.phoneNumber ?? '',
      address: response.address ?? '',
      city: response.city ?? '',
      dateOfBirth: response.dateOfBirth ? new Date(response.dateOfBirth) : null,
      status: response.status ?? 'Active',
      lastContactDate: response.lastContactDate
        ? new Date(response.lastContactDate)
        : null,
      notes: response.notes ?? '',
    } as any);

    this.clientForm.markAsPristine();
    this.clientForm.markAsUntouched();
  }

  finishClient() {
    if (this.clientForm) {
      console.log('usli smo');

      const toIso = (d: any) => {
        if (!d) return '';
        if (d instanceof Date) return d.toISOString();
        try {
          return new Date(d).toISOString();
        } catch {
          return '';
        }
      };

      const finishedClient: createUpdateClientDto = {
        firstName: this.clientForm.controls.firstName.value || '',
        lastName: this.clientForm.controls.lastName.value || '',
        email: this.clientForm.controls.email.value ?? null,
        phoneNumber: this.clientForm.controls.phoneNumber.value ?? null,
        address: this.clientForm.controls.address.value ?? null,
        city: this.clientForm.controls.city.value || '',
        dateOfBirth: toIso(this.clientForm.controls.dateOfBirth.value),
        status: this.clientForm.controls.status.value || 'Active',
        notes: this.clientForm.controls.notes.value ?? null,
        agentId: this.currentAgent?.id ?? 1,
      };

      if (this.editMode && this.clientId) {
        this.clientService.updateClient(finishedClient, this.clientId).subscribe({
          next: () => this.router.navigate(['/dashboard/clients']),
        });
      } else {
        this.clientService.addClient(finishedClient).subscribe(
          {next: () => this.router.navigate(['/dashboard/clients'])}
        );
      }

      console.log(finishedClient);
      
    }
  }
}
