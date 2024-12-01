import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { signup } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  private store = inject(Store<{ auth: AuthState }>);
  private fb = inject(FormBuilder);
  private _router = inject(Router);

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.store.dispatch(signup({ email, password }));
    }
  }
  login() {
    this._router.navigateByUrl('/login');
  }
}
