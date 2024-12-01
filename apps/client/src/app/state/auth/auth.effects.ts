import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../routes/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle Signup
  // signup$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.signupStart),
  //     switchMap(({ name, email, password }) =>
  //       this.authService.signup({ name, email, password }).pipe(
  //         map((response) =>
  //           AuthActions.signupSuccess({
  //             message: response.message,
  //           })
  //         ),
  //         catchError((error) =>
  //           of(
  //             AuthActions.signupFailure({
  //               error:
  //                 error.error?.message || 'Signup failed. Please try again.',
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  // // Navigate to Login after Successful Signup
  // signupSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.signupSuccess),
  //       tap(() => {
  //         this.router.navigate(['/login']);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.loginStart),
  //     switchMap(({ email, password }) =>
  //       this.authService.login({ email, password }).pipe(
  //         map((response) => {
  //           const user = {
  //             email: response.user.email,
  //             userId: response.user.userId,
  //           };
  //           return AuthActions.loginSuccess({
  //             user,
  //             token: response.token,
  //           });
  //         }),
  //         catchError((error) =>
  //           of(
  //             AuthActions.loginFailure({
  //               error:
  //                 error.error?.message || 'Login failed. Please try again.',
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  // // Redirect After Successful Login
  // loginRedirect$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap(() => {
  //         this.router.navigate(['/products']);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // // Auto Logout when Token Expires
  // autoLogout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap(({ token }) => {
  //         const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  //         const expiresAt = payload.exp * 1000; // Convert expiration time to milliseconds
  //         const duration = expiresAt - Date.now();

  //         setTimeout(() => {
  //           localStorage.clear();
  //           this.router.navigate(['/login']);
  //         }, duration);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // Handle Manual Logout
  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         localStorage.clear();
  //         this.router.navigate(['/login']);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
