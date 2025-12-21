import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule, Router } from '@angular/router';
import { InsuranceSummaryDto } from '../../../dtos/policies/insurance-summary.dto';
import { InsuranceService } from '../../../services/insurance-service';
import { PolicyService } from '../../../services/policy-service';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { GlobalService } from '../../../services/global-service';
import { take } from 'rxjs/operators';
import { ConfirmationWindowComponent } from '../../shared/confirmation-window/confirmation-window.component';

@Component({
  selector: 'app-insurance-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    RouterModule,
    ConfirmationWindowComponent,
  ],
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css'],
})
export class InsuranceListComponent implements OnInit {
  insurances: InsuranceSummaryDto[] = [];
  filteredInsurances: InsuranceSummaryDto[] = [];
  pagedInsurances: InsuranceSummaryDto[] = [];
  pageSize = 10;
  pageIndex = 0;
  // totalLength is used by MatPaginator to display the full number of items
  totalLength = 0;
  // reference to the MatPaginator in the template (added as #paginator)
  @ViewChild('paginator') paginator: any;
  insuranceService = inject(InsuranceService);
  policyService = inject(PolicyService);
  globalService = inject(GlobalService);
  router = inject(Router);
  currentAgent: responseAgentDto | null = null;
  
  // Confirmation dialog properties
  showConfirmation: boolean = false;
  policyToDelete: InsuranceSummaryDto | null = null;
  ngOnInit(): void {
    // kick off loading; updatePagedInsurances will be called after data arrives
    this.loadInsurances();
  }

  ngAfterViewInit(): void {
    // Keep paginator events in sync with component state. If the template
    // paginator emits page events, the (page) handler already handles them.
    // This subscription is defensive: it keeps the component state consistent
    // if someone interacts with the paginator UI directly.
    try {
      this.paginator?.page?.subscribe((ev: PageEvent) => this.onPageChange(ev));
    } catch (e) {
      // ignore if paginator isn't ready
    }
  }

  onSearch(query: string): void {
    const lower = query.toLowerCase();
    this.filteredInsurances = this.insurances.filter(
      (i) =>
        i.policyNumber?.toLowerCase().includes(lower) ||
        i.policyType?.toLowerCase().includes(lower) ||
        i.clientName?.toLowerCase().includes(lower)
    );
    this.pageIndex = 0;
   
    try { this.paginator?.firstPage(); } catch {}
    this.updatePagedInsurances();
  }

  updatePagedInsurances(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedInsurances = this.filteredInsurances.slice(start, end);

    this.totalLength = this.filteredInsurances.length;
  }

  onPageChange(event: any): void {
 
    const e = event as PageEvent;
    this.pageSize = e.pageSize ?? this.pageSize;
    this.pageIndex = e.pageIndex ?? this.pageIndex;
    this.updatePagedInsurances();
  }

  onView(policy: InsuranceSummaryDto): void {
    // Navigate to view form with type and id
    const type = policy.policyType?.toLowerCase() === 'car' ? 'car' : 'property';
    this.router.navigate(['/dashboard/insurances/view', type, policy.id]);
  }

  onEdit(policy: InsuranceSummaryDto): void {
    // Navigate to edit form with type and id
    // policyType should be 'Car' or 'Property', convert to lowercase for route
    const type = policy.policyType?.toLowerCase() === 'car' ? 'car' : 'property';
    this.router.navigate(['/dashboard/insurances/form', type, policy.id]);
  }

  onDeleteClick(policy: InsuranceSummaryDto): void {
    this.policyToDelete = policy;
    this.showConfirmation = true;
  }

  onCancelDelete(): void {
    this.showConfirmation = false;
    this.policyToDelete = null;
  }

  onConfirmDelete(): void {
    if (!this.policyToDelete) return;
    
    const policy = this.policyToDelete;
    const type = policy.policyType?.toLowerCase();
    
    if (type === 'car') {
      this.policyService.deleteCarInsurance(policy.id).subscribe({
        next: () => {
          this.showConfirmation = false;
          this.policyToDelete = null;
          this.loadInsurances();
        },
        error: (err) => {
          console.error('Failed to delete car insurance', err);
          alert('Failed to delete car insurance');
        }
      });
    } else {
      this.policyService.deletePropertyInsurance(policy.id).subscribe({
        next: () => {
          this.showConfirmation = false;
          this.policyToDelete = null;
          this.loadInsurances();
        },
        error: (err) => {
          console.error('Failed to delete property insurance', err);
          alert('Failed to delete property insurance');
        }
      });
    }
  }

  onDelete(policy: InsuranceSummaryDto): void {
    this.onConfirmDelete();
  }

  loadInsurances() {
   
    this.globalService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        this.currentAgent = response;
        if (!this.currentAgent) return;

        this.insuranceService.getInsurancesByAgent(this.currentAgent.id).pipe(take(1)).subscribe({
          next: (data) => {
            // Ensure arrays are defined even if API returns null
            this.insurances = data || [];
            this.filteredInsurances = this.insurances;
            // start on first page after load
            this.pageIndex = 0;
            this.updatePagedInsurances();
          },
          error: (err) => console.error('Failed to load insurances', err),
        });
      },
      error: (err) => console.error('Failed to read current user', err),
    });
  }

  getCarPoliciesCount(): number {
    return this.insurances.filter(i => i.policyType?.toLowerCase() === 'car').length;
  }

  getPropertyPoliciesCount(): number {
    return this.insurances.filter(i => i.policyType?.toLowerCase() === 'property').length;
  }
}
