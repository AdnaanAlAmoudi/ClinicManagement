// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';
import { ReceptionistComponent } from './components/receptionist/receptionist';
import { DoctorComponent } from './components/doctor/doctor';
import { PatientService } from './services/patient';
import { AdminComponent } from './components/admin-component/admin-component';
import { LoginComponent } from './components/login-component/login-component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized';
import { AuthService } from './services/auth';
import { UserService } from './services/userservice';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    
    
  
    //LoginComponent,
    //         AdminComponent
  
    //UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppComponent,
    ReceptionistComponent,
    DoctorComponent,
    AdminComponent,
    LoginComponent,
    UnauthorizedComponent
  ],
  providers: [
    PatientService,
    AuthService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }
