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
  clients : ResponseClientDto[] = [];

  clientService = inject(ClientService)
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'city', 'actions'];

  ngOnInit(): void {
    this.clientService.getClientsByAgentId(1).subscribe({
      next: (response) => this.clients = response
    })
  }
}
