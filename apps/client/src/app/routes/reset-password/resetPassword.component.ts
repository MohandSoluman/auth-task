import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resetPassword.component.html',
  styleUrl: './resetPassword.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  error: string | null = null;
  isLoading = false;
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  messageService = inject(MessageService);
  private _router = inject(Router);

  email: string | null = null;
  token: string | null = null;
  constructor() {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.email || !this.token) {
      this.error = 'Invalid or missing reset link.';
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid && this.email && this.token) {
      this.isLoading = true;
      const { password } = this.resetPasswordForm.value;
      this._authService
        .resetPassword({ token: this.token, newPassword: password })
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.error = null;
            this.resetPasswordForm.reset();
            this.showSuccess('check your email');
            this._router.navigate(['/login']);
          },
          error: (err) => {
            this.isLoading = false;
            this.showError(err.message);
          },
        });
    }
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
