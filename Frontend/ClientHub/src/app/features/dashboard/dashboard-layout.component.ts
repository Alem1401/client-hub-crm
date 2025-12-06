import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OnInit } from '@angular/core';
import { GlobalService } from '../../services/global-service';
import { responseAgentDto } from '../../dtos/agent/response-agent.dto';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule,
    
],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  isSidenavOpen = true;
  router = inject(Router)
  globalService = inject(GlobalService);
  currentUser : responseAgentDto | null = null;
 // ngOnInit(): void {
   // this.globalService.currentUser$.subscribe({
     // next : (response) =>{ this.currentUser= response
      //if(!response){
        //this.router.navigate([""]);


     // }  
      //}
      
    //})
  //}

}
