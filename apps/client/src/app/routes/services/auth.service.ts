// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  message: string;
  token: string;
  user: {
    userId: any;
    name: string;
    email: string;
  };
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private user: { name: string; email: string } | null = null;

  constructor(private http: HttpClient) {}

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data);
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  forgotPassword(email: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/password/forgot`, {
      email,
    });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/password/reset`, {
      token,
      newPassword,
    });
  }

  setAuthData(token: string, user: { name: string; email: string }): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): { name: string; email: string } | null {
    if (!this.user) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    }
    return this.user;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.user = null;
  }
}
