export interface InsuranceSummaryDto {
  id: number;
  policyNumber: string;
  policyType: string;
  clientId: number;
  clientName: string;
  endDate: Date;
  daysUntilExpiry: number;
}