import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.login,
    AuthActions.signup,
    AuthActions.forgotPassword,
    AuthActions.resetPassword,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
  })),
  on(
    AuthActions.signupSuccess,
    AuthActions.forgotPasswordSuccess,
    AuthActions.resetPasswordSuccess,
    (state) => ({
      ...state,
      loading: false,
    })
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.signupFailure,
    AuthActions.forgotPasswordFailure,
    AuthActions.resetPasswordFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
