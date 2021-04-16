import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './service/product.service';
import { RouterModule, Routes } from '@angular/router';
import { CheckingLoginGuardService } from '../auth/services/checking-login-guard.service';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductCreateEditComponent } from './component/product-create-edit/product-create-edit.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [CheckingLoginGuardService] },
  { path: 'add', component: ProductCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/edit', component: ProductCreateEditComponent, canActivate: [CheckingLoginGuardService] },
  { path: ':id/view', component: ProductViewComponent, canActivate: [CheckingLoginGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProductListComponent, ProductCreateEditComponent, ProductViewComponent],
  providers: [ProductService]
})
export class ProductModule { }
