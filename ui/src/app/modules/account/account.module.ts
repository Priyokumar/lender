import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './service/account.service';
import { AccountListComponent } from './component/account-list/account-list.component';
import { AccountCreateEditComponent } from './component/account-create-edit/account-create-edit.component';
import { AccountViewComponent } from './component/account-view/account-view.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';
import { MaterialModule } from '../shared/material/material.module';
import { LeadService } from '../lead/service/lead.service';
import { ProductService } from '../product/service/product.service';

const routes: Routes = [
  { path: '', component: AccountListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'add', component: AccountCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/edit', component: AccountCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/view', component: AccountViewComponent, canActivate: [CheckingLoginGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  declarations: [
    AccountListComponent,
    AccountCreateEditComponent,
    AccountViewComponent
  ],
  providers: [AccountService, LeadService, ProductService]
})
export class AccountModule { }
