import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/userservice';
import { AuthService } from '../../services/auth';
import { User, CreateUserRequest, UserRole } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./admin-component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  showAddForm = false;
  editingUser: User | null = null;
  loading = false;
  error = '';
  success = '';
  userRoles = UserRole;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.Receptionist, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.error = 'Failed to load users';
      }
    });
  }

  showAddUserForm() {
    this.showAddForm = true;
    this.editingUser = null;
    this.userForm.reset({ role: UserRole.Receptionist });
    this.error = '';
    this.success = '';
  }

  editUser(user: User) {
    this.editingUser = user;
    this.showAddForm = true;
    this.userForm.patchValue({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: '' // Don't populate password for editing
    });
    this.error = '';
    this.success = '';
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      this.error = '';

      const userData: CreateUserRequest = this.userForm.value;

      if (this.editingUser) {
        // Update user
        this.userService.updateUser(this.editingUser.id, userData).subscribe({
          next: () => {
            this.loading = false;
            this.success = 'User updated successfully';
            this.loadUsers();
            this.cancelForm();
          },
          error: (error) => {
            this.loading = false;
            this.error = error.error || 'Failed to update user';
          }
        });
      } else {
        // Create new user
        this.userService.createUser(userData).subscribe({
          next: () => {
            this.loading = false;
            this.success = 'User created successfully';
            this.loadUsers();
            this.cancelForm();
          },
          error: (error) => {
            this.loading = false;
            this.error = error.error || 'Failed to create user';
          }
        });
      }
    }
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.success = 'User deleted successfully';
          this.loadUsers();
        },
        error: (error) => {
          this.error = 'Failed to delete user';
        }
      });
    }
  }

  cancelForm() {
    this.showAddForm = false;
    this.editingUser = null;
    this.userForm.reset();
    this.error = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
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
