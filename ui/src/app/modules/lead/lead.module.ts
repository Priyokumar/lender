import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from './service/lead.service';
import { LeadListComponent } from './component/lead-list/lead-list.component';
import { LeadCreateEditComponent } from './component/lead-create-edit/lead-create-edit.component';
import { LeadViewComponent } from './component/lead-view/lead-view.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { CustomerService } from '../customer/service/customer.service';
import { ProductService } from '../product/service/product.service';
import { DialogModule } from '../dialog/dialog.module';

const routes: Routes = [
  { path: '', component: LeadListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'add', component: LeadCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/edit', component: LeadCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/view', component: LeadViewComponent, canActivate: [CheckingLoginGuardService] },
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
    LeadListComponent,
    LeadCreateEditComponent,
    LeadViewComponent
  ],
  providers: [LeadService, CustomerService, ProductService]
})
export class LeadModule { }
