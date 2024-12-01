import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: { email: string; userId: string } | null;
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signupSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, () => initialState)
);
