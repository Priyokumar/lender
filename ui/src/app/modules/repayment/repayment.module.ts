import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepaymentService } from './service/repayment.service';
import { RepaymentListComponent } from './component/repayment-list/repayment-list.component';
import { RepaymentCreateEditComponent } from './component/repayment-create-edit/repayment-create-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { AccountService } from '../account/service/account.service';
import { DialogModule } from '../dialog/dialog.module';
import { EmiService } from '../account/service/emi.service';

const routes: Routes = [
  { path: '', component: RepaymentListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'add', component: RepaymentCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/edit', component: RepaymentCreateEditComponent, canActivate: [CheckingLoginGuardService] }
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
  declarations: [RepaymentListComponent, RepaymentCreateEditComponent],
  providers: [RepaymentService, AccountService, EmiService]
})
export class RepaymentModule { }
