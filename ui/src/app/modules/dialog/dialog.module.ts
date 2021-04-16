import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListDialogComponent } from './components/customer-list-dialog/customer-list-dialog.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProductListDialogComponent } from './components/product-list-dialog/product-list-dialog.component';
import { LeadListDialogComponent } from './components/lead-list-dialog/lead-list-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    CustomerListDialogComponent,
    ProductListDialogComponent,
    LeadListDialogComponent
  ],
  entryComponents: [
    CustomerListDialogComponent,
    ProductListDialogComponent,
    LeadListDialogComponent
  ]
})
export class DialogModule { }
