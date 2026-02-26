import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { DataEntryComponent } from './features/data-entry/data-entry.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'data-entry', component: DataEntryComponent },
      { path: 'data-entry/:id', component: DataEntryComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
