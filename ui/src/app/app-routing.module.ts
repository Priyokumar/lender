import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'security', loadChildren: './modules/security/security.module#SecurityModule' },
  { path: 'customers', loadChildren: './modules/customer/customer.module#CustomerModule' },
  { path: 'products', loadChildren: './modules/product/product.module#ProductModule' },
  { path: 'leads', loadChildren: './modules/lead/lead.module#LeadModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
