export interface ResponseClientDto {
  id: number;
  firstName: string;
  lastName: string;

  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city: string;
  dateOfBirth: string; 

  status: string;
  notes?: string | null;
  agentId?: number | null;

  lastContactDate?: string | null; 
}
