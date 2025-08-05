// components/doctor/doctor.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient';
import { Patient, DoctorExamination, Symptom, Diagnosis } from '../../models/patient.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, KeyValuePipe],
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css']
})
export class DoctorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly userService = inject(AuthService);
  private readonly router = inject(Router);

  // Signals for reactive state management
  patients = signal<Patient[]>([]);
  selectedPatient = signal<Patient | null>(null);
  symptoms = signal<Symptom[]>([]);
  diagnoses = signal<Diagnosis[]>([]);
  loading = signal(false);
  submitting = signal(false);

  // Computed signals for organized data
  sortedPatients = computed(() => 
    this.patients().sort((a, b) => 
      new Date(a.appointmentTime).getTime() - new Date(b.appointmentTime).getTime()
    )
  );

  symptomCategories = computed(() => {
    const categories: { [key: string]: Symptom[] } = {};
    this.symptoms().forEach(symptom => {
      if (!categories[symptom.category]) {
        categories[symptom.category] = [];
      }
      categories[symptom.category].push(symptom);
    });
    return categories;
  });

  diagnosisCategories = computed(() => {
    const categories: { [key: string]: Diagnosis[] } = {};
    this.diagnoses().forEach(diagnosis => {
      if (!categories[diagnosis.category]) {
        categories[diagnosis.category] = [];
      }
      categories[diagnosis.category].push(diagnosis);
    });
    return categories;
  });

  selectedSymptomNames = computed(() => {
    const selectedIds = this.examinationForm.get('selectedSymptoms')?.value || [];
    return this.symptoms()
      .filter(s => selectedIds.includes(s.id))
      .map(s => s.name);
  });

  selectedDiagnosisNames = computed(() => {
    const selectedIds = this.examinationForm.get('selectedDiagnoses')?.value || [];
    return this.diagnoses()
      .filter(d => selectedIds.includes(d.id))
      .map(d => `${d.name} (${d.code})`);
  });

  examinationForm: FormGroup = this.createExaminationForm();

  ngOnInit(): void {
    this.loadPatients();
    this.loadSymptoms();
    this.loadDiagnoses();
  }

  private createExaminationForm(): FormGroup {
    return this.fb.group({
      selectedSymptoms: [[]],
      selectedDiagnoses: [[]],
      prescriptions: [''],
      doctorNotes: [''],
      doctorName: ['', Validators.required]
    });
  }

  loadPatients(): void {
    this.loading.set(true);
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients.set(patients);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        alert('Error loading patients. Please try again.');
        this.loading.set(false);
      }
    });
  }

  loadSymptoms(): void {
    this.patientService.getSymptoms().subscribe({
      next: (symptoms) => {
        this.symptoms.set(symptoms);
      },
      error: (error) => {
        console.error('Error loading symptoms:', error);
      }
    });
  }

  loadDiagnoses(): void {
    this.patientService.getDiagnoses().subscribe({
      next: (diagnoses) => {
        this.diagnoses.set(diagnoses);
      },
      error: (error) => {
        console.error('Error loading diagnoses:', error);
      }
    });
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient.set(patient);
    
    // Pre-populate form if patient has been examined before
    this.examinationForm.patchValue({
      selectedSymptoms: patient.selectedSymptoms || [],
      selectedDiagnoses: patient.selectedDiagnoses || [],
      prescriptions: patient.prescriptions || '',
      doctorNotes: patient.doctorNotes || '',
      doctorName: patient.doctorName || ''
    });
  }

  onSymptomChange(symptomId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedSymptoms = [...(this.examinationForm.get('selectedSymptoms')?.value || [])];
    
    if (target.checked) {
      if (!selectedSymptoms.includes(symptomId)) {
        selectedSymptoms.push(symptomId);
      }
    } else {
      const index = selectedSymptoms.indexOf(symptomId);
      if (index > -1) {
        selectedSymptoms.splice(index, 1);
      }
    }
    
    this.examinationForm.patchValue({ selectedSymptoms });
  }

  onDiagnosisChange(diagnosisId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedDiagnoses = [...(this.examinationForm.get('selectedDiagnoses')?.value || [])];
    
    if (target.checked) {
      if (!selectedDiagnoses.includes(diagnosisId)) {
        selectedDiagnoses.push(diagnosisId);
      }
    } else {
      const index = selectedDiagnoses.indexOf(diagnosisId);
      if (index > -1) {
        selectedDiagnoses.splice(index, 1);
      }
    }
    
    this.examinationForm.patchValue({ selectedDiagnoses });
  }

  isSymptomSelected(symptomId: number): boolean {
    const selectedSymptoms = this.examinationForm.get('selectedSymptoms')?.value || [];
    return selectedSymptoms.includes(symptomId);
  }

  isDiagnosisSelected(diagnosisId: number): boolean {
    const selectedDiagnoses = this.examinationForm.get('selectedDiagnoses')?.value || [];
    return selectedDiagnoses.includes(diagnosisId);
  }

  onSubmitExamination(): void {
    if (this.examinationForm.valid && this.selectedPatient()) {
      this.submitting.set(true);
      const currentPatient = this.selectedPatient()!;
      
      const examination: DoctorExamination = {
        patientId: currentPatient.id!,
        selectedSymptoms: this.examinationForm.value.selectedSymptoms,
        selectedDiagnoses: this.examinationForm.value.selectedDiagnoses,
        prescriptions: this.examinationForm.value.prescriptions,
        doctorNotes: this.examinationForm.value.doctorNotes,
        doctorName: this.examinationForm.value.doctorName
      };

      this.patientService.updateExamination(currentPatient.id!, examination).subscribe({
        next: () => {
          alert('Examination saved successfully!');
          this.loadPatients();
          this.cancelExamination();
        },
        error: (error) => {
          console.error('Error saving examination:', error);
          alert('Error saving examination. Please try again.');
          this.submitting.set(false);
        }
      });
    }
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  cancelExamination(): void {
    this.selectedPatient.set(null);
    this.examinationForm.reset();
    this.submitting.set(false);
  }

  // Getter methods for template
  get isFormValid(): boolean {
    return this.examinationForm.valid;
  }

  get currentPatientName(): string {
    const patient = this.selectedPatient();
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
