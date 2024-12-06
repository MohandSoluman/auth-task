import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  signup(): void {
    if (this.signupForm?.valid) {
      const { name, email, password, confirmPassword } = this.signupForm.value;
      this._authService
        .signup({ name, email, password, confirmPassword })
        .subscribe({
          next: () => {
            this._router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Signup failed', err);
          },
        });
    }
  }
  login() {
    this._router.navigate(['/login']);
  }
}
