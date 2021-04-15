import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckingLoginGuardService } from './modules/auth/services/checking-login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'security', loadChildren: './modules/security/security.module#SecurityModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
