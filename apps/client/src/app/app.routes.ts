import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
import { ProductManagmentComponent } from './routes/product-managment/product-managment.component';
import { ProductListComponent } from './routes/product-list/product-list.component';
import { ResetPasswordComponent } from './routes/reset-password/resetPassword.component';
import { ForgetPasswordComponent } from './routes/forget-password/forget-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  {
    path: 'products',
    component: ProductListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'product-management',
    component: ProductManagmentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'product-management/:id',
    component: ProductManagmentComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
