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
import { RouterModule } from '@angular/router';
import { InsuranceSummaryDto } from '../../../dtos/policies/insurance-summary.dto';
import { InsuranceService } from '../../../services/insurance-service';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { GlobalService } from '../../../services/global-service';
import { take } from 'rxjs/operators';

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
  globalService = inject(GlobalService);
  currentAgent: responseAgentDto | null = null;
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
    // When searching, reset the UI paginator to the first page (if present)
    try { this.paginator?.firstPage(); } catch {}
    this.updatePagedInsurances();
  }

  updatePagedInsurances(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedInsurances = this.filteredInsurances.slice(start, end);
    // Update totalLength so MatPaginator shows the correct overall count
    this.totalLength = this.filteredInsurances.length;
  }

  onPageChange(event: any): void {
    // Accept both PageEvent and a synthetic object; prefer typed values
    const e = event as PageEvent;
    this.pageSize = e.pageSize ?? this.pageSize;
    this.pageIndex = e.pageIndex ?? this.pageIndex;
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

  loadInsurances() {
    // Subscribe once to currentUser$ (avoid memory leaks) and then fetch
    // insurances for that agent. After data arrives we populate the arrays
    // and initialize pagination.
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
}
