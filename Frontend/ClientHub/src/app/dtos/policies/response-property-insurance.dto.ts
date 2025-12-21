export interface ResponsePropertyInsuranceDto {
  id: number;
  agentId: number;
  clientId: number;

  // Policy Information
  startDate: string;
  endDate: string;
  policyNumber: string;
  totalAmount: number;
  discount: number;
  surcharge: number;
  notes?: string;

  // Property Information
  address: string;
  city: string;
  risks: string;
  squareMeters: number;
}
