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
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResponseClientDto } from '../../../dtos/client/response-client.dto';
import { ClientService } from '../../../services/client-service';




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
    RouterModule
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

  clientService = inject(ClientService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'city', 'actions'];

  ngOnInit(): void {
    this.clientService.getClientsByAgentId(1).subscribe({
      next: (response) => {
        this.clients = response;
        this.filteredClients = response;
        this.updatePagedClients();
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
    // TODO: Implement view logic (e.g., open dialog or navigate)
    console.log('View client', client);
  }

  onDelete(client: ResponseClientDto): void {
 
  }
}
