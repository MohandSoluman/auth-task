import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);
  private _router = inject(Router);

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      // Send email to user with reset password link
      const { email } = this.forgotPasswordForm.value;
      console.log(`Reset password link sent to: ${email}`);
      // Reset form
      this.forgotPasswordForm.reset();
      // Redirect to login page
      this._router.navigate(['/login']);
      // Or show success message
      alert('Reset password link sent successfully');
    }
  }
}
