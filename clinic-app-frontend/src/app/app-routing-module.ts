import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { AdminComponent } from '../app/components/admin-component/admin-component';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from './models/user.model';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized';
import { DoctorComponent } from './components/doctor/doctor';
import { ReceptionistComponent } from './components/receptionist/receptionist';

// Import your existing components
// import { DoctorComponent } from './components/doctor/doctor.component';
// import { ReceptionistComponent } from './components/receptionist/receptionist.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: UserRole.Admin }
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard],
    data: { role: UserRole.Doctor }
  },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    canActivate: [AuthGuard],
    data: { role: UserRole.Receptionist }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    LoginComponent,
    AdminComponent,
    DoctorComponent,
    ReceptionistComponent,
    UnauthorizedComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
