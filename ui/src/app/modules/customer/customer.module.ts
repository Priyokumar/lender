import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerViewComponent } from './component/customer-view/customer-view.component';
import { CustomerCreateEditComponent } from './component/customer-create-edit/customer-create-edit.component';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { CustomerService } from './service/customer.service';

const routes: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'add', component: CustomerCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/edit', component: CustomerCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/view', component: CustomerViewComponent, canActivate: [CheckingLoginGuardService] },
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
    CustomerListComponent,
    CustomerViewComponent,
    CustomerCreateEditComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
