import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCarInsuranceDto } from '../dtos/policies/create-car-insurance.dto';
import { CreatePropertyInsuranceDto } from '../dtos/policies/create-property-insurance.dto';
import { InsuranceSummaryDto } from '../dtos/policies/insurance-summary.dto';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'https://localhost:57197/api'; // TODO: Update with your actual API URL

  constructor(private http: HttpClient) {}

  // Car Insurance
  createCarInsurance(carInsurance: CreateCarInsuranceDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/CarInsurance`, carInsurance);
  }

  getCarInsurances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/CarInsurance`);
  }

  getCarInsuranceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/CarInsurance/${id}`);
  }

  updateCarInsurance(id: number, carInsurance: CreateCarInsuranceDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/CarInsurance/${id}`, carInsurance);
  }

  deleteCarInsurance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/CarInsurance/${id}`);
  }

  // Property Insurance
  createPropertyInsurance(propertyInsurance: CreatePropertyInsuranceDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/PropertyInsurance`, propertyInsurance);
  }

  getPropertyInsurances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/PropertyInsurance`);
  }

  getPropertyInsuranceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PropertyInsurance/${id}`);
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
