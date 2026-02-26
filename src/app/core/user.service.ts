import { Injectable } from '@angular/core';
import { User } from './models/user.model';

const STORAGE_KEY = 'user-management-users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = this.loadFromStorage();

  private loadFromStorage(): User[] {
    // guard for SSR / missing localStorage
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
    }
  }

  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  addUser(user: Omit<User, 'id'>): User {
    const id = this.generateId();
    const newUser: User = { ...user, id };
    this.users.push(newUser);
    this.saveToStorage();
    return newUser;
  }

  updateUser(id: string, data: Partial<Omit<User, 'id'>>): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...data };
    this.saveToStorage();
    return this.users[index];
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  private generateId(): string {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }
}
