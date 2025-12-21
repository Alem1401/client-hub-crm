import { Component, OnInit ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResponseClientDto } from '../../../dtos/client/response-client.dto';
import { ClientService } from '../../../services/client-service';
import { GlobalService } from '../../../services/global-service';
import { ConfirmationWindowComponent } from '../../shared/confirmation-window/confirmation-window.component';
import { responseAgentDto } from '../../../dtos/agent/response-agent.dto';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    RouterModule,
    ConfirmationWindowComponent
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: ResponseClientDto[] = [];
  filteredClients: ResponseClientDto[] = [];
  pagedClients: ResponseClientDto[] = [];
  pageSize = 10;
  pageIndex = 0;

  showConfirmation: boolean = false;
  clientToDelete: ResponseClientDto | null = null;

  clientService = inject(ClientService);
  globalService = inject(GlobalService);
  dialog = inject(MatDialog);
  router = inject(Router);
  currentAgent: responseAgentDto | null = null;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'city', 'actions'];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.globalService.currentUser$.pipe(take(1)).subscribe({
      next: (agent) => {
        this.currentAgent = agent;
        if (!this.currentAgent) return;
        
        this.clientService.getClientsByAgentId(this.currentAgent.id).subscribe({
          next: (response) => {
            this.clients = response;
            this.filteredClients = response;
            this.updatePagedClients();
          }
        });
      }
    });
  }

  onSearch(query: string): void {
    const lower = query.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.firstName?.toLowerCase().includes(lower) ||
      client.lastName?.toLowerCase().includes(lower) ||
      client.email?.toLowerCase().includes(lower) ||
      client.city?.toLowerCase().includes(lower)
    );
    this.pageIndex = 0;
    this.updatePagedClients();
  }

  updatePagedClients(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedClients = this.filteredClients.slice(start, end);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedClients();
  }

  onView(client: ResponseClientDto): void {
    this.router.navigate(['/dashboard/clients/view', client.id]);
  }

  onDeleteClick(client: ResponseClientDto): void {
    this.clientToDelete = client;
    this.showConfirmation = true;
  }

  onCancelDelete(): void {
    this.showConfirmation = false;
    this.clientToDelete = null;
  }

  onConfirmDelete(): void {
    if (!this.clientToDelete) return;
    
    this.clientService.deleteClient(this.clientToDelete.id).subscribe({
      next: () => {
        this.showConfirmation = false;
        this.clientToDelete = null;
        this.loadClients();
      },
      error: (err) => {
        console.error('Failed to delete client', err);
        alert('Failed to delete client');
      }
    });
  }

  getRecentClientsCount(): number {
    // Return count of clients added in the current month (placeholder logic)
    // In a real app, you'd filter by createdAt date
    return Math.min(this.clients.length, 5);
  }
}
