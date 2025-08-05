//// app.component.ts
//import { Component, signal } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { ReceptionistComponent } from './components/receptionist/receptionist';
//import { DoctorComponent } from './components/doctor/doctor';
//import { LoginComponent } from './components/login-component/login-component';
//import { AdminComponent } from './components/admin-component/admin-component';

//@Component({
//  selector: 'app-root',
//  standalone: true,
//  imports: [CommonModule, ReceptionistComponent, DoctorComponent, AdminComponent, LoginComponent],
//  templateUrl: './app.html',
//  styleUrls: ['./app.css']
//})
//export class AppComponent {
//  title = 'Clinic Management System';
//  currentView = signal<'receptionist' | 'doctor'>('receptionist');

//  switchToReceptionist(): void {
//    this.currentView.set('receptionist');
//  }

//  switchToDoctor(): void {
//    this.currentView.set('doctor');
//  }

//  get isReceptionistView(): boolean {
//    return this.currentView() === 'receptionist';
//  }

//  get isDoctorView(): boolean {
//    return this.currentView() === 'doctor';
//  }
//}
//import { CommonModule } from '@angular/common';
//import { Component } from '@angular/core';
//import { RouterModule } from '@angular/router';

//@Component({
//  selector: 'app-root',
//  template: `
//    <router-outlet></router-outlet>
//  `,
//  styles: [`
//    :host {
//      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//    }
//  `],
//  imports: [RouterModule, CommonModule],
//})
//export class AppComponent {
//  title = 'hospital-management';
//}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  `]
})
export class AppComponent {
  title = 'hospital-management';
}
