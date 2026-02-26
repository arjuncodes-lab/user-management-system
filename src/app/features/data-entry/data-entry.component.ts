import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
})
export class DataEntryComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  private editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = id;
      const user = this.userService.getUserById(id); // load for edit
      if (user) {
        this.form.patchValue({
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          address: user.address,
          phone: user.phone,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value;
    if (this.isEdit && this.editId) {
      this.userService.updateUser(this.editId, value);
    } else {
      this.userService.addUser(value);
    }
    this.router.navigate(['/users']);
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
