import { Routes } from '@angular/router';
//import { UserListComponent } from './routes/user-list/user-list.component';
//import { UserManagmentComponent } from './routes/user-managment/user-managment.component';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
//import { ResetPasswordComponent } from './routes/reset-password/resetPassword.component';
//import { ForgetPasswordComponent } from './routes/forget-password/forget-password.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'resetPassword', component: ResetPasswordComponent },
  // { path: 'forgetPassword', component: ForgetPasswordComponent },
  // {
  //   path: 'users',
  //   component: UserListComponent,
  // },
  // {
  //   path: 'user-management',
  //   component: UserManagmentComponent,
  // },
  // {
  //   path: 'user-management/:id',
  //   component: UserManagmentComponent,
  // },
  //{ path: '**', redirectTo: '/login' },
];
