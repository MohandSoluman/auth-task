import { Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  errorMessage = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

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
    this._router.navigate(['/forgetPassword']);
  }
}
