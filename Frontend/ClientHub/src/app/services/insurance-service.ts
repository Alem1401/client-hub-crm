import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { InsuranceSummaryDto } from '../dtos/policies/insurance-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  http = inject(HttpClient);


  getInsurancesByAgent(id : number){
    return this.http.get<InsuranceSummaryDto[]>(`https://localhost:58878/api/Insurance/agent/${id}`)
  }
}
