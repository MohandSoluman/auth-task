import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducers/auth.reducers';
import { resetPassword } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resetPassword.component.html',
  styleUrl: './resetPassword.component.css',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  private store = inject(Store<{ auth: AuthState }>);
  private fb = inject(FormBuilder);

  constructor() {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;
      this.store.dispatch(resetPassword({ password }));
    }
  }
}
