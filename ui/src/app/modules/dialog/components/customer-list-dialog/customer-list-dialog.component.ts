import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { ICustomer } from 'src/app/modules/customer/customer.model';
import { CustomerService } from 'src/app/modules/customer/service/customer.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-list-dialog.component.html',
  styleUrls: ['./customer-list-dialog.component.scss']
})
export class CustomerListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['customerId', 'name', 'mobileNo', 'gender', 'occupation', 'status', 'address'];
  public dataSource: MatTableDataSource<ICustomer>;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerListDialogComponent>
  ) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  select(customer: ICustomer) {
    this.dialogRef.close(customer);
  }

  close() {
    this.dialogRef.close();
  }

}