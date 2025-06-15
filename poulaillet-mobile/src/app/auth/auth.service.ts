// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/dashboard');
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
