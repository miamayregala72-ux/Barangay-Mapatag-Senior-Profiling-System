
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  WIDOWED = 'Widowed',
  DIVORCED = 'Divorced'
}

export interface MedicalRecord {
  conditions: string[];
  allergies: string[];
  medications: string[];
  mobilityIssues: string;
  lastCheckup: string;
}

export interface AssistanceRecord {
  id: string;
  type: 'Financial' | 'Relief Goods' | 'Medical Mission' | 'Social Pension' | 'Other';
  date: string;
  status: 'Received' | 'Pending' | 'Flagged';
  notes?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface SeniorCitizen {
  id: string; // SCID
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  age: number;
  gender: Gender;
  address: string;
  purok: string;
  maritalStatus: MaritalStatus;
  phoneNumber: string;
  photoUrl?: string;
  emergencyContact: EmergencyContact;
  medicalInfo: MedicalRecord;
  assistanceHistory: AssistanceRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  targetId?: string;
  details: string;
}

export interface DashboardStats {
  totalSeniors: number;
  maleCount: number;
  femaleCount: number;
  purokDistribution: Record<string, number>;
  totalBenefitsIssued: number;
}
