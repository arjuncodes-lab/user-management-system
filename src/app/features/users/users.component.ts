import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  addUser(): void {
    this.router.navigate(['/data-entry']);
  }

  editUser(id: string): void {
    this.router.navigate(['/data-entry', id]);
  }

  deleteUser(user: User): void {
    if (!confirm(`Delete user "${user.name}"?`)) {
      return;
    }
    this.userService.deleteUser(user.id);
    this.loadUsers();
  }
}
