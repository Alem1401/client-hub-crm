import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../services/global-service';
import { AnalyticsService } from '../../../services/analytics-service';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    BaseChartDirective
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  globalService = inject(GlobalService);
  analyticsService = inject(AnalyticsService);
  currentAgent: responseAgentDto | null = null;

  // Time period filter
  selectedPeriod: string = 'month';

  // Revenue Analytics
  totalRevenue: number = 0;
  previousRevenue: number = 0;
  revenueGrowth: number = 0;

  // Policy Analytics
  totalPolicies: number = 156;
  newPoliciesThisMonth: number = 23;
  renewedPolicies: number = 45;
  expiredPolicies: number = 12;
  renewalRate: number = 78.9;
  averagePolicyValue: number = 806;
  carPolicies: number = 98;
  propertyPolicies: number = 58;

  // Client Analytics
  totalClients: number = 89;
  newClientsThisMonth: number = 12;
  clientGrowth: number = 15.6;
  averagePoliciesPerClient: number = 1.75;
  topClients: { name: string; totalPremium: number; policyCount: number }[] = [
    { name: 'John Smith', totalPremium: 12500, policyCount: 5 },
    { name: 'Sarah Johnson', totalPremium: 9800, policyCount: 4 },
    { name: 'Michael Brown', totalPremium: 8200, policyCount: 3 },
    { name: 'Emily Davis', totalPremium: 7500, policyCount: 3 },
    { name: 'Robert Wilson', totalPremium: 6200, policyCount: 2 }
  ];

  // Revenue Chart Configuration
  revenueChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Revenue',
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(99, 102, 241, 1)'
    }]
  };
  revenueChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw?.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${Number(value).toLocaleString()}`
        },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Policy Trend Chart Configuration
  policyChartData: ChartData<'line'> = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [15, 18, 22, 19, 25, 23],
      label: 'New Policies',
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };
  policyChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Client Acquisition Chart Configuration
  clientChartData: ChartData<'bar'> = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [8, 12, 10, 14, 11, 12],
      label: 'New Clients',
      backgroundColor: 'rgba(245, 158, 11, 0.8)',
      borderColor: 'rgba(245, 158, 11, 1)',
      borderWidth: 1,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(245, 158, 11, 1)'
    }]
  };
  clientChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Policy Distribution Doughnut Chart
  distributionChartData: ChartData<'doughnut'> = {
    labels: ['Car Insurance', 'Property Insurance'],
    datasets: [{
      data: [98, 58],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(16, 185, 129, 1)'
      ],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };
  distributionChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  ngOnInit(): void {
    this.globalService.currentUser$.subscribe({
      next: (agent) => {
        this.currentAgent = agent;
        if (agent) {
          this.loadAnalyticsData(agent.id);
        }
      }
    });
  }

  loadAnalyticsData(agentId: number): void {
    // Load Revenue Analytics
    this.analyticsService.getRevenueAnalytics(agentId).subscribe({
      next: (data) => {
        // Update chart data
        this.revenueChartData = {
          ...this.revenueChartData,
          labels: data.months,
          datasets: [{
            ...this.revenueChartData.datasets[0],
            data: data.monthlyRevenues
          }]
        };

        // Calculate total revenue (sum of all months)
        this.totalRevenue = data.monthlyRevenues.reduce((sum, val) => sum + val, 0);

        // Calculate previous revenue (all months except last)
        if (data.monthlyRevenues.length > 1) {
          this.previousRevenue = data.monthlyRevenues
            .slice(0, -1)
            .reduce((sum, val) => sum + val, 0);
          
          // Calculate growth based on last month vs previous month
          const lastMonth = data.monthlyRevenues[data.monthlyRevenues.length - 1] || 0;
          const prevMonth = data.monthlyRevenues[data.monthlyRevenues.length - 2] || 0;
          this.revenueGrowth = prevMonth > 0 
            ? ((lastMonth - prevMonth) / prevMonth) * 100 
            : 0;
        }
      },
      error: (err) => {
        console.error('Error loading revenue analytics:', err);
      }
    });
  }

  onPeriodChange(): void {
    if (this.currentAgent) {
      this.loadAnalyticsData(this.currentAgent.id);
    }
  }

  getGrowthClass(value: number): string {
    return value >= 0 ? 'positive' : 'negative';
  }

  getGrowthIcon(value: number): string {
    return value >= 0 ? 'trending_up' : 'trending_down';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  formatPercentage(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }
}
