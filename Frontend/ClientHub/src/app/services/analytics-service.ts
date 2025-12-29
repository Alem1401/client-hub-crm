import { Injectable,inject } from '@angular/core';
import { GlobalService } from './global-service';
import { HttpClient } from '@angular/common/http';
import { RevenueAnalyticsDto } from '../dtos/analytics/revenue-analytics.dto';
import { ClientsAddedAnalyticsDto } from '../dtos/analytics/clients-added-analytics.dto';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  globalService = inject(GlobalService)
  http = inject(HttpClient)

  getRevenueAnalytics(agentId : number){
    return this.http.get<RevenueAnalyticsDto>(`${this.globalService.apiUrl}/Analytics/revenue/${agentId}`)
  }

  getClientsAddedMonthly(agentId : number){
    return this.http.get<ClientsAddedAnalyticsDto>(`${this.globalService.apiUrl}/Analytics/client-count/${agentId}`)
  }
   
  getPropertyInsuranceCount(agentId : number){
    return this.http.get<number>(`${this.globalService.apiUrl}/Analytics/count/property/${agentId}`)
  }



    getCarInsuranceCount(agentId : number){
    return this.http.get<number>(`${this.globalService.apiUrl}/Analytics/count/car/${agentId}`)
  }

  getTotalPolicies(agentId : number){
    return this.http.get<number>(`${this.globalService.apiUrl}/Analytics/total-policies/${agentId}`);
  }
                              
  getNewThisMonthCount(agentId : number){
      return this.http.get<number>(`${this.globalService.apiUrl}/Analytics/new-this-month/${agentId}`);
  }

  getExpiredCount(agentId : number){
    return  this.http.get<number>(`${this.globalService.apiUrl}/Analytics/expired/${agentId}`);
  }

  getAveragePolicyValue(agentId : number){
    return  this.http.get<number>(`${this.globalService.apiUrl}/Analytics/avg-policy-value/${agentId}`);
  }
  
}
