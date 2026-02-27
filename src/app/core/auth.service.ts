import { Injectable } from '@angular/core';

const AUTH_KEY = 'user-management-auth';
const DEMO_USER = { username: 'arjun', password: 'Arjun@123' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(AUTH_KEY);
  }

  login(username: string, password: string): boolean {
    const valid =
      username === DEMO_USER.username && password === DEMO_USER.password;
    if (valid) {
      localStorage.setItem(AUTH_KEY, 'true');
    }
    return valid;
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
}
