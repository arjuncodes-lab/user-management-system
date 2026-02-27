import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';

function maxDateToday(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const d = new Date(control.value);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return d <= today ? null : { maxDate: true };
}

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
      dateOfBirth: ['', [Validators.required, maxDateToday]],
      address: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[0-9+\-\s()]+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = id;
      const user = this.userService.getUserById(id);
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
