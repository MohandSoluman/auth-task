import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resetPassword.component.html',
  styleUrl: './resetPassword.component.css',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  private fb = inject(FormBuilder);

  constructor() {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;
    }
  }
}
