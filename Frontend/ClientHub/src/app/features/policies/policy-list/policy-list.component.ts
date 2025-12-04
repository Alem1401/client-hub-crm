import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { InsuranceSummaryDto } from '../../../dtos/policies/insurance-summary.dto';



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
    RouterModule
  ],
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class InsuranceListComponent implements OnInit {
  insurances: InsuranceSummaryDto[] = [];
  filteredInsurances: InsuranceSummaryDto[] = [];
  pagedInsurances: InsuranceSummaryDto[] = [];
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    // Placeholder data - replace with actual service call
    this.insurances = [
      { id: 1, policyNumber: 'POL-2024-001', policyType: 'Auto Insurance', clientName: 'John Doe', endDate: new Date('2025-12-31') },
      { id: 2, policyNumber: 'POL-2024-002', policyType: 'Home Insurance', clientName: 'Jane Smith', endDate: new Date('2025-06-15') },
      { id: 3, policyNumber: 'POL-2024-003', policyType: 'Life Insurance', clientName: 'Bob Johnson', endDate: new Date('2026-03-20') },
      { id: 4, policyNumber: 'POL-2024-004', policyType: 'Health Insurance', clientName: 'Alice Williams', endDate: new Date('2025-01-10') },
      { id: 5, policyNumber: 'POL-2024-005', policyType: 'Auto Insurance', clientName: 'Charlie Brown', endDate: new Date('2025-09-05') }
    ];
    this.filteredInsurances = this.insurances;
    this.updatePagedInsurances();
  }

  onSearch(query: string): void {
    const lower = query.toLowerCase();
    this.filteredInsurances = this.insurances.filter(i =>
      i.policyNumber?.toLowerCase().includes(lower) ||
      i.policyType?.toLowerCase().includes(lower) ||
      i.clientName?.toLowerCase().includes(lower)
    );
    this.pageIndex = 0;
    this.updatePagedInsurances();
  }

  updatePagedInsurances(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedInsurances = this.filteredInsurances.slice(start, end);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedInsurances();
  }

  onView(policy: InsuranceSummaryDto): void {
    // TODO: Implement view logic
    console.log('View insurance', policy);
  }

  onEdit(policy: InsuranceSummaryDto): void {
    // TODO: Implement edit logic
    console.log('Edit insurance', policy);
  }

  onDelete(policy: InsuranceSummaryDto): void {
    // TODO: Implement delete logic
    console.log('Delete insurance', policy);
  }
}
