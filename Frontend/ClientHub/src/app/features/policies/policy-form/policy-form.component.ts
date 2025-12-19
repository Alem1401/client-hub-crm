import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCarInsuranceDto } from '../../../dtos/policies/create-car-insurance.dto';
import { CreatePropertyInsuranceDto } from '../../../dtos/policies/create-property-insurance.dto';
import { PolicyService } from '../../../services/policy-service';
import { MatIconModule } from '@angular/material/icon';
import { GlobalService } from '../../../services/global-service';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { ClientService } from '../../../services/client-service';
import { searchClienttDto } from '../../../dtos/client/search-client.dto';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatIconModule
  ],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {
  policyForm!: FormGroup;
  selectedInsuranceType: string = '';
  isSubmitting = false;
  maxProductionYear = new Date().getFullYear() + 1;
  
  insuranceTypes = [
    { value: 'car', label: 'Car Insurance' },
    { value: 'property', label: 'Property Insurance' }
  ];

  vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Motorcycle', 'Van', 'Other'];
  purposes = ['Private', 'Commercial', 'Taxi', 'Rent-a-car'];
  categories = ['M1', 'M2', 'M3', 'N1', 'N2', 'N3', 'L'];
  colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Other'];

  // Client search properties
  searchQuery: string = '';
  showSuggestions: boolean = false;
  suggestions: searchClienttDto[] = [];
  selectedClient: searchClienttDto | null = null;

    private policyService = inject(PolicyService)
    private router = inject(Router)
    private global = inject(GlobalService)
    private clientService = inject(ClientService)
    currentAgent : responseAgentDto | null = null;
  ngOnInit(): void {
    this.initializeForm();
    this.global.currentUser$.subscribe({
        next: cu => this.currentAgent = cu
    })
  }

  initializeForm(): void {
    this.policyForm = new FormGroup({
      insuranceType: new FormControl('', Validators.required),
      clientId: new FormControl('', Validators.required),
      policyNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      totalAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
      discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      surcharge: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      notes: new FormControl('', Validators.maxLength(500))
    });
  }

  onInsuranceTypeChange(type: string): void {
    this.selectedInsuranceType = type;
    this.removeCarInsuranceControls();
    this.removePropertyInsuranceControls();
    
    if (type === 'car') {
      this.addCarInsuranceControls();
    } else if (type === 'property') {
      this.addPropertyInsuranceControls();
    }
  }

  addCarInsuranceControls(): void {
    this.policyForm.addControl('bonus', new FormControl(0, [Validators.required, Validators.min(0)]));
    this.policyForm.addControl('chassisNumber', new FormControl('', [Validators.required, Validators.maxLength(100)]));
    this.policyForm.addControl('color', new FormControl('', Validators.required));
    this.policyForm.addControl('vehicleType', new FormControl('', Validators.required));
    this.policyForm.addControl('purpose', new FormControl('', Validators.required));
    this.policyForm.addControl('category', new FormControl('', Validators.required));
    this.policyForm.addControl('registrationPlate', new FormControl('', [Validators.required, Validators.maxLength(20)]));
    this.policyForm.addControl('productionYear', new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]));
    this.policyForm.addControl('powerKw', new FormControl('', [Validators.required, Validators.min(1)]));
    this.policyForm.addControl('engineCcm', new FormControl('', [Validators.required, Validators.min(1)]));
    this.policyForm.addControl('type', new FormControl('', [Validators.required, Validators.maxLength(100)]));
  }

  removeCarInsuranceControls(): void {
    const carControls = ['bonus', 'chassisNumber', 'color', 'vehicleType', 'purpose', 
                         'category', 'registrationPlate', 'productionYear', 'powerKw', 
                         'engineCcm', 'type'];
    carControls.forEach(control => this.policyForm.removeControl(control));
  }

  addPropertyInsuranceControls(): void {
    this.policyForm.addControl('address', new FormControl('', [Validators.required, Validators.maxLength(200)]));
    this.policyForm.addControl('city', new FormControl('', [Validators.required, Validators.maxLength(100)]));
    this.policyForm.addControl('risks', new FormControl('', [Validators.required, Validators.maxLength(500)]));
    this.policyForm.addControl('squareMeters', new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)]));
  }

  removePropertyInsuranceControls(): void {
    const propertyControls = ['address', 'city', 'risks', 'squareMeters'];
    propertyControls.forEach(control => this.policyForm.removeControl(control));
  }

  onSubmit(): void {
    
    if(this.selectedInsuranceType == 'car'){
       if(this.policyForm.valid)
       {
        const insurance : CreateCarInsuranceDto = {
            category  : this.policyForm.value.category,
            bonus: this.policyForm.value.bonus,
            chassisNumber: this.policyForm.value.chassisNumber,
            color: this.policyForm.value.color,
            vehicleType: this.policyForm.value.vehicleType,
            purpose: this.policyForm.value.purpose,
            registrationPlate: this.policyForm.value.registrationPlate,
            productionYear: this.policyForm.value.productionYear,
            powerKw: this.policyForm.value.powerKw,
            engineCcm: this.policyForm.value.engineCcm,
            type: this.policyForm.value.type,
            startDate: new Date(this.policyForm.value.startDate),
            endDate: new Date(this.policyForm.value.endDate),
            policyNumber: this.policyForm.value.policyNumber,
            totalAmount: this.policyForm.value.totalAmount,
            discount: this.policyForm.value.discount,
            surcharge: this.policyForm.value.surcharge,
            notes: this.policyForm.value.notes,
            clientId: this.policyForm.value.clientId,
            agentId: this.currentAgent?.id || 0
        }
        
        this.isSubmitting = true;
        this.policyService.createCarInsurance(insurance).subscribe({
          next: () => {
            alert('Car insurance policy created successfully!');
            this.router.navigate(['/dashboard/insurances']);
          },
          error: (error) => {
            console.error('Error creating car insurance:', error);
            alert('Failed to create car insurance policy');
            this.isSubmitting = false;
          }
        });
       }
    } else if(this.selectedInsuranceType == 'property'){
       if(this.policyForm.valid)
       {
        const insurance : CreatePropertyInsuranceDto = {
            address: this.policyForm.value.address,
            city: this.policyForm.value.city,
            risks: this.policyForm.value.risks,
            squareMeters: this.policyForm.value.squareMeters,
            startDate: new Date(this.policyForm.value.startDate),
            endDate: new Date(this.policyForm.value.endDate),
            policyNumber: this.policyForm.value.policyNumber,
            totalAmount: this.policyForm.value.totalAmount,
            discount: this.policyForm.value.discount,
            surcharge: this.policyForm.value.surcharge,
            notes: this.policyForm.value.notes,
            clientId: this.policyForm.value.clientId,
            agentId: this.currentAgent?.id || 0
        }
        
        this.isSubmitting = true;
        console.log(insurance);
        this.policyService.createPropertyInsurance(insurance).subscribe({
          next: () => {
            alert('Property insurance policy created successfully!');
            this.router.navigate(['/dashboard/insurances']);
          },
          error: (error) => {
            console.error('Error creating property insurance:', error);
            alert('Failed to create property insurance policy');
            this.isSubmitting = false;
          }
        });
       }
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.policyForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.policyForm.get(fieldName);
    if (field?.hasError('required')) return 'This field is required';
    if (field?.hasError('min')) return `Minimum value is ${field.errors?.['min'].min}`;
    if (field?.hasError('max')) return `Maximum value is ${field.errors?.['max'].max}`;
    if (field?.hasError('maxlength')) return `Maximum length is ${field.errors?.['maxlength'].requiredLength}`;
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/policies']);
  }

  // Test method - Fill form with sample data
  fillTestData(type: 'car' | 'property'): void {
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    // Fill common fields
    this.policyForm.patchValue({
      insuranceType: type,
      clientId: 1,
      policyNumber: `POL-${Math.floor(Math.random() * 10000)}`,
      startDate: today.toISOString().split('T')[0],
      endDate: oneYearLater.toISOString().split('T')[0],
      totalAmount: 1500,
      discount: 10,
      surcharge: 5,
      notes: 'Test policy for development purposes'
    });

    // Trigger insurance type change
    this.onInsuranceTypeChange(type);

    if (type === 'car') {
      // Fill car-specific fields
      setTimeout(() => {
        this.policyForm.patchValue({
          bonus: 250,
          chassisNumber: 'VIN123456789ABCD',
          color: 'Black',
          vehicleType: 'Sedan',
          purpose: 'Private',
          category: 'M1',
          registrationPlate: 'ABC-1234',
          productionYear: 2022,
          powerKw: 110,
          engineCcm: 1600,
          type: 'Full Coverage'
        });
      }, 100);
    } else if (type === 'property') {
      // Fill property-specific fields
      setTimeout(() => {
        this.policyForm.patchValue({
          address: '123 Main Street, Apartment 4B',
          city: 'Springfield',
          risks: 'Fire, Flood, Theft, Earthquake, Storm Damage',
          squareMeters: 85
        });
      }, 100);
    }

    console.log('Test data filled for:', type);
  }

  // Client search methods
  onSearchInput(): void {
    if (this.searchQuery.trim().length > 0 && this.currentAgent?.id) {
      this.clientService.searchClients(this.searchQuery, this.currentAgent.id).subscribe({
        next: (results: any) => {
          console.log('Search results:', results);
          this.suggestions = results;
          this.showSuggestions = true;
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.suggestions = [];
        }
      });
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onSearchFocus(): void {
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  onSearchBlur(): void {
    // Delay to allow click on suggestion
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  selectSuggestion(client: searchClienttDto): void {
    this.selectedClient = client;
    this.searchQuery = client.fullName;
    this.policyForm.patchValue({ clientId: client.id });
    this.showSuggestions = false;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.selectedClient = null;
    this.suggestions = [];
    this.showSuggestions = false;
    this.policyForm.patchValue({ clientId: '' });
  }

  onSearch(): void {
    if (this.searchQuery.trim() && this.currentAgent?.id) {
      this.onSearchInput();
    }
  }
}
