import { NgModule, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerListDialogComponent } from "./components/customer-list-dialog/customer-list-dialog.component";
import { MaterialModule } from "../shared/material/material.module";
import { ProductListDialogComponent } from "./components/product-list-dialog/product-list-dialog.component";
import { LeadListDialogComponent } from "./components/lead-list-dialog/lead-list-dialog.component";
import { EmiListDialogComponent } from "./components/emi-list-dialog/emi-list-dialog.component";
import { AccountListDialogComponent } from "./components/account-list-dialog/account-list-dialog.component";
import { RepaymentListDialogComponent } from "./components/repayment-list-dialog/repayment-list-dialog.component";
import { RepaymentDialogComponent } from "./components/repayment-dialog/repayment-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const components: Type<any>[] = [
  CustomerListDialogComponent,
  ProductListDialogComponent,
  LeadListDialogComponent,
  EmiListDialogComponent,
  AccountListDialogComponent,
  RepaymentListDialogComponent,
  RepaymentDialogComponent
];

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [...components],
  entryComponents: [...components],
  exports:[...components]
})
export class DialogModule {}
