import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'security', loadChildren: './modules/security/security.module#SecurityModule' },
  { path: 'customers', loadChildren: './modules/customer/customer.module#CustomerModule' },
  { path: 'products', loadChildren: './modules/product/product.module#ProductModule' },
  { path: 'leads', loadChildren: './modules/lead/lead.module#LeadModule' },
  { path: 'accounts', loadChildren: './modules/account/account.module#AccountModule' },
  { path: 'repayments', loadChildren: './modules/repayment/repayment.module#RepaymentModule' },
  { path: 'customer360', loadChildren: './modules/customer360/customer360.module#Customer360Module' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
