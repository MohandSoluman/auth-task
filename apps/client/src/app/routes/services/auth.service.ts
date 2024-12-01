// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private user: { name: string; email: string } | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  signup(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, { email, password });
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, { password });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.user = null;
  }
}
