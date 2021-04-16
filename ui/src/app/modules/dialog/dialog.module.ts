import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [CustomerDialogComponent, ProductDialogComponent],
  entryComponents:[CustomerDialogComponent, ProductDialogComponent]
})
export class DialogModule { }
