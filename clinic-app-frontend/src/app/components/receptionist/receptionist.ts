// components/receptionist/receptionist.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient';
import { Patient, PatientCreate } from '../../models/patient.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-receptionist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './receptionist.html',
  styleUrls: ['./receptionist.css']
})
export class ReceptionistComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly userService = inject(AuthService);
  private readonly router = inject(Router);

  // Signals for reactive state management
  patients = signal<Patient[]>([]);
  editingPatient = signal<Patient | null>(null);
  showForm = signal(false);
  loading = signal(false);

  // Computed signal for sorted patients
  sortedPatients = computed(() => 
    this.patients().sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    )
  );

  patientForm: FormGroup = this.createForm();

  ngOnInit(): void {
    this.loadPatients();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      dateOfBirth: ['', Validators.required],
      sex: ['', Validators.required],
      weight: [''],
      height: [''],
      shoeSize: [''],
      appointmentTime: ['', Validators.required],
      insuranceName: [''],
      phoneNumber: [''],
      address: [''],
      emergencyContact: [''],
      emergencyPhone: [''],
      medicalHistory: [''],
      allergies: ['']
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

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.loading.set(true);
      const patientData: PatientCreate = {
        ...this.patientForm.value,
        dateOfBirth: new Date(this.patientForm.value.dateOfBirth),
        appointmentTime: new Date(this.patientForm.value.appointmentTime)
      };

      const currentEditingPatient = this.editingPatient();
      
      if (currentEditingPatient) {
        this.patientService.updatePatient(currentEditingPatient.id!, patientData).subscribe({
          next: () => {
            this.loadPatients();
            this.resetForm();
            alert('Patient updated successfully!');
          },
          error: (error) => {
            console.error('Error updating patient:', error);
            alert('Error updating patient. Please try again.');
            this.loading.set(false);
          }
        });
      } else {
        this.patientService.createPatient(patientData).subscribe({
          next: () => {
            this.loadPatients();
            this.resetForm();
            alert('Patient registered successfully!');
          },
          error: (error) => {
            console.error('Error creating patient:', error);
            alert('Error registering patient. Please try again.');
            this.loading.set(false);
          }
        });
      }
    }
  }

  editPatient(patient: Patient): void {
    this.editingPatient.set(patient);
    this.showForm.set(true);
    
    // Format dates for input fields
    const dobFormatted = new Date(patient.dateOfBirth).toISOString().split('T')[0];
    const appointmentFormatted = new Date(patient.appointmentTime).toISOString().slice(0, 16);
    
    this.patientForm.patchValue({
      ...patient,
      dateOfBirth: dobFormatted,
      appointmentTime: appointmentFormatted
    });
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.loading.set(true);
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.loadPatients();
          alert('Patient deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
          alert('Error deleting patient. Please try again.');
          this.loading.set(false);
        }
      });
    }
  }

  resetForm(): void {
    this.patientForm.reset();
    this.editingPatient.set(null);
    this.showForm.set(false);
    this.loading.set(false);
  }

  toggleForm(): void {
    this.showForm.update(show => !show);
    if (!this.showForm()) {
      this.resetForm();
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

  // Getter methods for template
  get isFormInvalid(): boolean {
    return !this.patientForm.valid;
  }

  get currentFormTitle(): string {
    return this.editingPatient() ? 'Edit Patient' : 'Register New Patient';
  }

  get currentSubmitText(): string {
    return this.editingPatient() ? 'Update Patient' : 'Register Patient';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
