import { Injectable,inject } from '@angular/core';
import { GlobalService } from './global-service';
import { HttpClient } from '@angular/common/http';
import { RevenueAnalyticsDto } from '../dtos/analytics/revenue-analytics.dto';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  globalService = inject(GlobalService)
  http = inject(HttpClient)

  getRevenueAnalytics(agentId : number){
    return this.http.get<RevenueAnalyticsDto>(`${this.globalService.apiUrl}/Analytics/revenue/${agentId}`)
  }
  
}
