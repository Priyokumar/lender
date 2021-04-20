import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNumberCardComponent } from './component/customer-number-card/customer-number-card.component';
import { DashboardLayoutComponent } from './component/dashboard-layout/dashboard-layout.component';
import { OverallSendoiDonoughtChartComponent } from './component/overall-sendoi-donought-chart/overall-sendoi-donought-chart.component';
import { SendoiRepaymentChartComponent } from './component/sendoi-repayment-chart/sendoi-repayment-chart.component';
import { TotalSendoiInvestmentNumberCardComponent } from './component/total-sendoi-investment-number-card/total-sendoi-investment-number-card.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardService } from './service/dashboard.service';
import { RepaymentBarChartComponent } from './component/repayment-bar-chart/repayment-bar-chart.component';
import { CustomerService } from '../customer/service/customer.service';
import { PipeModule } from '../pipe/pipe.module';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, canActivate: [CheckingLoginGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    PipeModule 
  ],
  declarations: [
    CustomerNumberCardComponent,
    DashboardLayoutComponent,
    OverallSendoiDonoughtChartComponent,
    SendoiRepaymentChartComponent,
    TotalSendoiInvestmentNumberCardComponent,
    RepaymentBarChartComponent
  ],
  providers: [DashboardService, CustomerService]
})
export class DashboardModule { }
