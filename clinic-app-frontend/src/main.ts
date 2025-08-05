// main.ts - Bootstrap file for Angular 20
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app';
import { AppRoutingModule } from './app/app-routing-module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule)
  ]
}).catch(err => console.error(err));
