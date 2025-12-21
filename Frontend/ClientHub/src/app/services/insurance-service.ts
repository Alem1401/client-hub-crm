import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { InsuranceSummaryDto } from '../dtos/policies/insurance-summary.dto';
import { GlobalService } from './global-service';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  http = inject(HttpClient);
  globalService = inject(GlobalService);


  getInsurancesByAgent(id : number){
    return this.http.get<InsuranceSummaryDto[]>(`${this.globalService.apiUrl}/Insurance/agent/${id}`)
  }
}
