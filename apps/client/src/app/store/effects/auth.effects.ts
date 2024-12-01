import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../routes/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((token) => AuthActions.loginSuccess({ token })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map(() => AuthActions.signupSuccess()),
          catchError((error) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      mergeMap(({ email }) =>
        this.authService.forgotPassword(email).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) =>
            of(AuthActions.forgotPasswordFailure({ error: error.message }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(({ password }) =>
        this.authService.resetPassword(password).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((error) =>
            of(AuthActions.resetPasswordFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
