
import { SeniorCitizen, Gender, MaritalStatus } from '../types';

export const mockSeniors: SeniorCitizen[] = [
  {
    id: "SC-2026-001",
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Santos",
    birthDate: "1954-05-15",
    age: 72,
    gender: Gender.MALE,
    address: "Purok 1, Brgy. Mapatag",
    purok: "Purok 1",
    maritalStatus: MaritalStatus.MARRIED,
    phoneNumber: "0917-123-4567",
    photoUrl: "https://picsum.photos/seed/juan/200/200",
    emergencyContact: {
      name: "Maria Dela Cruz",
      relationship: "Spouse",
      phone: "0918-765-4321"
    },
    medicalInfo: {
      conditions: ["Hypertension", "Diabetes"],
      allergies: ["Penicillin"],
      medications: ["Metformin", "Losartan"],
      mobilityIssues: "None",
      lastCheckup: "2025-12-10"
    },
    assistanceHistory: [
      { id: "A1", type: "Social Pension", date: "2025-11-20", status: "Received" },
      { id: "A2", type: "Relief Goods", date: "2025-12-05", status: "Received" }
    ],
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-12-05T14:30:00Z"
  },
  {
    id: "SC-2026-002",
    firstName: "Elena",
    lastName: "Ramos",
    middleName: "Bautista",
    birthDate: "1948-08-22",
    age: 77,
    gender: Gender.FEMALE,
    address: "Purok 3, Brgy. Mapatag",
    purok: "Purok 3",
    maritalStatus: MaritalStatus.WIDOWED,
    phoneNumber: "0920-555-0192",
    photoUrl: "https://picsum.photos/seed/elena/200/200",
    emergencyContact: {
      name: "Roberto Ramos",
      relationship: "Son",
      phone: "0921-111-2222"
    },
    medicalInfo: {
      conditions: ["Osteoarthritis"],
      allergies: [],
      medications: ["Calcium", "Vitamin D"],
      mobilityIssues: "Uses Cane",
      lastCheckup: "2025-11-15"
    },
    assistanceHistory: [
      { id: "A3", type: "Medical Mission", date: "2025-10-15", status: "Received" }
    ],
    createdAt: "2025-10-01T08:00:00Z",
    updatedAt: "2025-11-15T09:00:00Z"
  }
];
