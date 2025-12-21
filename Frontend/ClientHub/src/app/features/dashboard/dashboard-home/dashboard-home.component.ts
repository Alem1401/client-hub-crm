import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GlobalService } from '../../../services/global-service';
import { InsuranceService } from '../../../services/insurance-service';
import { InsuranceSummaryDto } from '../../../dtos/policies/insurance-summary.dto';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent  implements OnInit{
  globalService = inject(GlobalService);
  insuranceService = inject(InsuranceService);
  insurances : InsuranceSummaryDto[] = [];
  expiringPolicies: InsuranceSummaryDto[] = [];
  currentAgent : responseAgentDto | null = null;

  ngOnInit(): void {
    this.globalService.currentUser$.subscribe({
      next: r => {
        this.currentAgent = r;
        this.insuranceService.getInsurancesByAgent(this.currentAgent ? this.currentAgent.id : 0).subscribe({
          next: i => {
            this.insurances = i;
            // Filter policies expiring within 30 days and sort by end date
            this.expiringPolicies = this.insurances
              .filter(policy => this.getDaysLeft(policy.endDate) <= 30 && this.getDaysLeft(policy.endDate) >= 0)
              .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
              .slice(0, 5); // Show top 5
          }
        });
      }
    });
  }

  getDaysLeft(endDate: Date | string): number {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getDaysBadgeClass(endDate: Date | string): string {
    const days = this.getDaysLeft(endDate);
    if (days <= 7) return 'critical';
    if (days <= 14) return 'warning';
    return 'safe';
  }
}
