import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  features = [
    {
      icon: 'people',
      title: 'Client Management',
      description: 'Efficiently manage all your clients in one centralized platform with advanced tracking and organization.'
    },
    {
      icon: 'shield',
      title: 'Insurance Tracking',
      description: 'Keep track of all insurance policies, renewals, and important dates with automated reminders.'
    },
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Get detailed insights and reports on your business performance with powerful analytics tools.'
    },
    {
      icon: 'support_agent',
      title: 'Agent Management',
      description: 'Manage your team of agents, assign tasks, and monitor performance all in one place.'
    },
    {
      icon: 'security',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security ensures your data is protected with the highest standards.'
    },
    {
      icon: 'cloud',
      title: 'Cloud-Based',
      description: 'Access your data anywhere, anytime with our secure cloud-based infrastructure.'
    }
  ];
}
