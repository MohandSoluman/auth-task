import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email && password) {
        this._authService.login({ email, password }).subscribe({
          next: () => {
            this._router.navigate(['/products']);
          },
          error: (err) => {
            alert(err.error?.message || 'Login failed');
          },
        });
      } else {
        alert('Email and password are required');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  goToSignup() {
    this._router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this._router.navigate(['/forgot-password']);
  }
}
