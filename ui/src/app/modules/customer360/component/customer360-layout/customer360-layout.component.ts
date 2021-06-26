import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ICustomer } from 'src/app/modules/customer/customer.model';
import { CustomerListDialogComponent } from 'src/app/modules/dialog/components/customer-list-dialog/customer-list-dialog.component';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';

@Component({
  selector: 'app-customer360-layout',
  templateUrl: './customer360-layout.component.html',
  styleUrls: ['./customer360-layout.component.scss']
})
export class Customer360LayoutComponent implements OnInit {

  selectedCustomer: ICustomer;
  customerCtrl = new FormControl('', Validators.required);

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  selectCustomer() {
    this.dialog.open(CustomerListDialogComponent, {data:{}, width: "65%" }).afterClosed().subscribe(customer => {
      if (customer) {
        this.selectedCustomer = customer;
        this.customerCtrl.setValue(customer.customerId);
      }
    });
  }

}
