// services/patient.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientCreate, DoctorExamination, Symptom, Diagnosis } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7075/api'; // Adjust port as needed

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/Patients`);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/Patients/${id}`);
  }

  createPatient(patient: PatientCreate): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/Patients`, patient);
  }

  updatePatient(id: number, patient: PatientCreate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Patients/${id}`, patient);
  }

  updateExamination(id: number, examination: DoctorExamination): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Patients/${id}/examination`, examination);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Patients/${id}`);
  }

  getSymptoms(): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${this.apiUrl}/symptoms`);
  }

  getDiagnoses(): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(`${this.apiUrl}/diagnoses`);
  }
}
