//import { Component } from '@angular/core';
//import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth';
//import { UserRole } from '../../models/user.model';

//@Component({
//  selector: 'app-login',
//  templateUrl: './login-component.html',
//  imports: [ReactiveFormsModule],
//  styleUrls: ['./login-component.css']
//})
//export class LoginComponent {
//  loginForm: FormGroup;
//  selectedRole: UserRole = UserRole.Admin;
//  userRoles = UserRole;
//  loading = false;
//  error = '';

//  constructor(
//    private fb: FormBuilder,
//    private authService: AuthService,
//    private router: Router
//  ) {
//    this.loginForm = this.fb.group({
//      username: ['', [Validators.required]],
//      password: ['', [Validators.required]],
//      role: [UserRole.Admin, [Validators.required]]
//    });
//  }

//  onRoleChange(role: UserRole) {
//    this.selectedRole = role;
//    this.loginForm.patchValue({ role });
//    this.error = '';
//  }

//  onSubmit() {
//    if (this.loginForm.valid) {
//      this.loading = true;
//      this.error = '';

//      this.authService.login(this.loginForm.value).subscribe({
//        next: (response) => {
//          this.loading = false;
//          if (response.success) {
//            // Redirect based on role
//            switch (response.user.role) {
//              case UserRole.Admin:
//                this.router.navigate(['/admin']);
//                break;
//              case UserRole.Doctor:
//                this.router.navigate(['/doctor']);
//                break;
//              case UserRole.Receptionist:
//                this.router.navigate(['/receptionist']);
//                break;
//            }
//          }
//        },
//        error: (error) => {
//          this.loading = false;
//          this.error = error.error?.message || 'Login failed. Please try again.';
//        }
//      });
//    }
//  }

//  getRoleText(role: UserRole): string {
//    switch (role) {
//      case UserRole.Admin: return 'Admin';
//      case UserRole.Doctor: return 'Doctor';
//      case UserRole.Receptionist: return 'Receptionist';
//      default: return '';
//    }
//  }
//}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserRole } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  selectedRole: UserRole = UserRole.Admin;
  userRoles = UserRole;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: [UserRole.Admin, [Validators.required]]
    });
  }

  onRoleChange(role: UserRole) {
    this.selectedRole = role;
    this.loginForm.patchValue({ role });
    this.error = '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            // Redirect based on role
            switch (response.user.role) {
              case UserRole.Admin:
                this.router.navigate(['/admin']);
                break;
              case UserRole.Doctor:
                this.router.navigate(['/doctor']);
                break;
              case UserRole.Receptionist:
                this.router.navigate(['/receptionist']);
                break;
            }
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  getRoleText(role: UserRole): string {
    switch (role) {
      case UserRole.Admin: return 'Admin';
      case UserRole.Doctor: return 'Doctor';
      case UserRole.Receptionist: return 'Receptionist';
      default: return '';
    }
  }
}
