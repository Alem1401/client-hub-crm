import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-window',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirmation-window.component.html',
  styleUrl: './confirmation-window.component.css'
})
export class ConfirmationWindowComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>(true);
  @Output() cancel = new EventEmitter<boolean>(false);
}
