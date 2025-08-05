//import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth';

//@Component({
//  selector: 'app-unauthorized',
//  standalone: true,
//  imports: [CommonModule],
//  template: `
//    <div class="unauthorized-container">
//      <div class="unauthorized-card">
//        <div class="unauthorized-icon">
//          <i class="fas fa-lock"></i>
//        </div>
//        <h2>Access Denied</h2>
//        <p>You don't have permission to access this page.</p>
//        <div class="actions">
//          <button class="btn btn-primary" (click)="goToLogin()">Go to Login</button>
//          <button class="btn btn-secondary" (click)="goBack()">Go Back</button>
//        </div>
//      </div>
//    </div>
//  `,
//  styles: [`
//    .unauthorized-container {
//      min-height: 100vh;
//      display: flex;
//      align-items: center;
//      justify-content: center;
//      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//      padding: 20px;
//    }

//    .unauthorized-card {
//      background: white;
//      border-radius: 15px;
//      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
//      padding: 60px 40px;
//      text-align: center;
//      max-width: 400px;
//      width: 100%;
//    }

//    .unauthorized-icon {
//      font-size: 64px;
//      color: #dc3545;
//      margin-bottom: 20px;
//    }

//    .unauthorized-card h2 {
//      color: #333;
//      margin-bottom: 15px;
//      font-weight: 600;
//    }

//    .unauthorized-card p {
//      color: #666;
//      margin-bottom: 30px;
//      line-height: 1.6;
//    }

//    .actions {
//      display: flex;
//      gap: 15px;
//      justify-content: center;
//    }

//    .btn {
//      padding: 12px 24px;
//      border: none;
//      border-radius: 8px;
//      cursor: pointer;
//      font-size: 16px;
//      font-weight: 500;
//      transition: all 0.3s ease;
//    }

//    .btn-primary {
//      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//      color: white;
//    }

//    .btn-primary:hover {
//      transform: translateY(-2px);
//      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
//    }

//    .btn-secondary {
//      background: #6c757d;
//      color: white;
//    }

//    .btn-secondary:hover {
//      background: #5a6268;
//      transform: translateY(-2px);
//    }

//    @media (max-width: 768px) {
//      .actions {
//        flex-direction: column;
//      }
//    }
//  `]
//})
//export class UnauthorizedComponent {
//  constructor(
//    private router: Router,
//    private authService: AuthService
//  ) { }

//  goToLogin() {
//    this.authService.logout();
//    this.router.navigate(['/login']);
//  }

//  goBack() {
//    window.history.back();
//  }
//}
//Improve
//Explain
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="unauthorized-icon">
          <i class="fas fa-lock"></i>
        </div>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <div class="actions">
          <button class="btn btn-primary" (click)="goToLogin()">Go to Login</button>
          <button class="btn btn-secondary" (click)="goBack()">Go Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .unauthorized-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      padding: 60px 40px;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .unauthorized-icon {
      font-size: 64px;
      color: #dc3545;
      margin-bottom: 20px;
    }

    .unauthorized-card h2 {
      color: #333;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .unauthorized-card p {
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }
  `]
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    window.history.back();
  }
}
