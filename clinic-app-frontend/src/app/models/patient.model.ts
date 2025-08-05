// models/patient.model.ts
export interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: string;
  weight?: number;
  height?: number;
  shoeSize?: string;
  appointmentTime: Date;
  insuranceName?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalHistory?: string;
  allergies?: string;
  createdAt?: Date;
  updatedAt?: Date;
  selectedSymptoms?: number[];
  selectedDiagnoses?: number[];
  prescriptions?: string;
  doctorNotes?: string;
  isExamined?: boolean;
  doctorName?: string;
  examinationDate?: Date;
  age?: number;
}

export interface PatientCreate {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: string;
  weight?: number;
  height?: number;
  shoeSize?: string;
  appointmentTime: Date;
  insuranceName?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalHistory?: string;
  allergies?: string;
}

export interface DoctorExamination {
  patientId: number;
  selectedSymptoms: number[];
  selectedDiagnoses: number[];
  prescriptions: string;
  doctorNotes: string;
  doctorName: string;
}

export interface Symptom {
  id: number;
  name: string;
  category: string;
}

export interface Diagnosis {
  id: number;
  name: string;
  code: string;
  category: string;
}
