import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from './service/role.service';
import { UserService } from './service/user.service';
import { RoleListComponent } from './component/role/role-list/role-list.component';
import { RoleCreateEditComponent } from './component/role/role-create-edit/role-create-edit.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserCreateEditComponent } from './component/user/user-create-edit/user-create-edit.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';

const routes: Routes = [
  { path: 'roles', component: RoleListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'roles/add', component: RoleCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'roles/:id/edit', component: RoleCreateEditComponent, canActivate: [CheckingLoginGuardService] },

  { path: 'users', component: UserListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'users/add', component: UserCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'users/:id/edit', component: UserCreateEditComponent, canActivate: [CheckingLoginGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RoleListComponent,
    RoleCreateEditComponent,
    UserListComponent,
    UserCreateEditComponent
  ],
  providers: [UserService, RoleService]
})
export class SecurityModule { }
