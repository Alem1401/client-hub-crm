import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCarInsuranceDto } from '../dtos/policies/create-car-insurance.dto';
import { CreatePropertyInsuranceDto } from '../dtos/policies/create-property-insurance.dto';
import { InsuranceSummaryDto } from '../dtos/policies/insurance-summary.dto';
import { GlobalService } from './global-service';
import { ResponseCarInsuranceDto } from '../dtos/policies/response-car-insurance.dto';
import { ResponsePropertyInsuranceDto } from '../dtos/policies/response-property-insurance.dto';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private http = inject(HttpClient);
  private globalService = inject(GlobalService);

  private get apiUrl(): string {
    return this.globalService.apiUrl;
  }

  // Car Insurance
  createCarInsurance(carInsurance: CreateCarInsuranceDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/CarInsurance`, carInsurance);
  }

  getCarInsurances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/CarInsurance`);
  }

  getCarInsuranceById(id: number): Observable<ResponseCarInsuranceDto> {
    return this.http.get<any>(`${this.apiUrl}/CarInsurance/${id}`);
  }

  updateCarInsurance(id: number, carInsurance: CreateCarInsuranceDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/CarInsurance/${id}`, carInsurance);
  }

  deleteCarInsurance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/CarInsurance/${id}`);
  }

 
  createPropertyInsurance(propertyInsurance: CreatePropertyInsuranceDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/PropertyInsurance`, propertyInsurance);
  }

  getPropertyInsurances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/PropertyInsurance`);
  }

  getPropertyInsuranceById(id: number): Observable<ResponsePropertyInsuranceDto> {
    return this.http.get<ResponsePropertyInsuranceDto>(`${this.apiUrl}/PropertyInsurance/${id}`);
  }

  updatePropertyInsurance(id: number, propertyInsurance: CreatePropertyInsuranceDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/PropertyInsurance/${id}`, propertyInsurance);
  }

  deletePropertyInsurance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/PropertyInsurance/${id}`);
  }

  // Get all insurances (combined)
  getAllInsurances(): Observable<InsuranceSummaryDto[]> {
    return this.http.get<InsuranceSummaryDto[]>(`${this.apiUrl}/Insurance/summary`);
  }

  // Get insurances by client
  getInsurancesByClientId(clientId: number): Observable<InsuranceSummaryDto[]> {
    return this.http.get<InsuranceSummaryDto[]>(`${this.apiUrl}/Insurance/client/${clientId}`);
  }

  // Get insurances by agent
  getInsurancesByAgentId(agentId: number): Observable<InsuranceSummaryDto[]> {
    return this.http.get<InsuranceSummaryDto[]>(`${this.apiUrl}/Insurance/agent/${agentId}`);
  }
}
