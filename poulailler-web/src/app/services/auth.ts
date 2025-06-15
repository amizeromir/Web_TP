import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly validUser = { username: 'admin', password: 'admin123' };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.validUser.username && password === this.validUser.password) {
      sessionStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('authenticated') === 'true';
  }

  logout(): void {
    sessionStorage.removeItem('authenticated');
    this.router.navigate(['/login']);
  }
}
