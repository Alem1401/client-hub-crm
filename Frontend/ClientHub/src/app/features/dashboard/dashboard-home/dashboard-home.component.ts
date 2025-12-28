import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GlobalService } from '../../../services/global-service';
import { InsuranceService } from '../../../services/insurance-service';
import { InsuranceSummaryDto } from '../../../dtos/policies/insurance-summary.dto';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { ClientService } from '../../../services/client-service';
import { RecentClientDto } from '../../../dtos/client/recent-client.dto';

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
  clientService = inject(ClientService);
  router = inject(Router);
  insurances : InsuranceSummaryDto[] = [];
  expiringPolicies: InsuranceSummaryDto[] = [];
  currentAgent : responseAgentDto | null = null;
  totalPolicies: number = 0;
  carPolicies: number = 0;
  propertyPolicies: number = 0;
  totalClients : number = 0;
  recentClients : RecentClientDto[] = [];
  totalRevenue : number = 0;
  currentDate: string = '';
  ngOnInit(): void {
      const date = new Date();
   
    this.currentDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.globalService.currentUser$.subscribe({
      next: r => {
        this.currentAgent = r;
        this.insuranceService.getInsurancesByAgent(this.currentAgent ? this.currentAgent.id : 0).subscribe({
          next: i => {
            this.insurances = i;
            this.totalPolicies = i.length;
            this.carPolicies = i.filter(p => (p.policyType || '').toString().toLowerCase() === 'car').length;
            this.propertyPolicies = i.filter(p => (p.policyType || '').toString().toLowerCase() === 'property').length;

         
            this.expiringPolicies = this.insurances
              .filter(policy => policy.daysUntilExpiry <= 30 && policy.daysUntilExpiry >= 0)
              .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
              .slice(0, 5);

              this.clientService.getClientCount(r?.id ? r.id : -1).subscribe({
                next : response => this.totalClients = response

              })

              this.clientService.getRecentClients(r?.id ? r.id : -1).subscribe({next: response => {this.recentClients = response;
                console.log(response);
              }});

              this.insuranceService.getMonthlyRevenueByAgent(r?.id ? r.id : -1).subscribe({
                next: value => this.totalRevenue = value
              })

            
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

  getRowClass(insurance: InsuranceSummaryDto): string {
    const days = this.getDaysLeft(insurance.endDate);
    if (days <= 7) return 'urgent critical-row';
    if (days <= 14) return 'warning-row';
    return 'safe-row';
  }

  viewClient(clientId: number | undefined): void {
    if (clientId !== undefined && clientId !== null) {
      this.router.navigate(['/dashboard/clients/view', clientId]);
    } else {
      console.warn('Client ID is not available for this policy');
    }
  }

  managePolicy(insurance: InsuranceSummaryDto): void {
    const type = insurance.policyType?.toLowerCase() === 'car' ? 'car' : 'property';
    this.router.navigate(['/dashboard/insurances/form', type, insurance.id]);
  }
}
