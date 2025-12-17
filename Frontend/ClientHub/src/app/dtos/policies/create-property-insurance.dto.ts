export interface CreatePropertyInsuranceDto {
  // Property-specific fields
  address: string;
  city: string;
  risks: string;
  squareMeters: number;

  // Common policy fields
  agentId: number;
  clientId: number;
  startDate: Date;
  endDate: Date;
  policyNumber: string;
  totalAmount: number;
  discount: number;
  surcharge: number;
  notes?: string;
}
