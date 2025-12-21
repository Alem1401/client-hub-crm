export interface ResponseCarInsuranceDto {
  id: number;

  bonus: number;
  chassisNumber: string;
  color: string;
  vehicleType: string;
  purpose: string;
  category: string;
  registrationPlate: string;
  productionYear: number;
  powerKw: number;
  engineCcm: number;
  type: string;


  startDate: string;
  endDate: string;
  policyNumber: string;
  totalAmount: number;
  discount: number;
  surcharge: number;
  notes?: string;


  clientId: number;
  agentId: number;

  
  isActive: boolean;
  daysUntilExpiry: number;
  finalPrice: number;
}
