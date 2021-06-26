import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer360LayoutComponent } from './component/customer360-layout/customer360-layout.component';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { AccountDetailsComponent } from './component/account-details/account-details.component';
import { DialogModule } from '../dialog/dialog.module';
import { AccountService } from '../account/service/account.service';
import { CustomerService } from '../customer/service/customer.service';
import { RepaymentService } from '../repayment/service/repayment.service';
import { Routes, RouterModule } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { MaterialModule } from '../shared/material/material.module';
import { InvestmentVsInterestCollectionChartComponent } from './component/investment-vs-interest-collection-chart/investment-vs-interest-collection-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard/service/dashboard.service';
import { LeadService } from '../lead/service/lead.service';

const routes: Routes = [
  { path: '', component: Customer360LayoutComponent, canActivate: [CheckingLoginGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    Customer360LayoutComponent,
    CustomerDetailsComponent,
    AccountDetailsComponent,
    InvestmentVsInterestCollectionChartComponent
  ],
  providers: [
    AccountService,
    CustomerService,
    RepaymentService,
    DashboardService,
    LeadService
  ]
})
export class Customer360Module { }
