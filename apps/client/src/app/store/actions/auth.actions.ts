import { createAction, props } from '@ngrx/store';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Signup Actions
export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string }>()
);
export const signupSuccess = createAction('[Auth] Signup Success');
export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

// Forgot Password Actions
export const forgotPassword = createAction(
  '[Auth] Forgot Password',
  props<{ email: string }>()
);
export const forgotPasswordSuccess = createAction(
  '[Auth] Forgot Password Success'
);
export const forgotPasswordFailure = createAction(
  '[Auth] Forgot Password Failure',
  props<{ error: string }>()
);

// Reset Password Actions
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ password: string }>()
);
export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);
export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);
