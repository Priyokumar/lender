import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { ICustomer } from "src/app/modules/customer/customer.model";
import { CustomerService } from "src/app/modules/customer/service/customer.service";
import { LeadService } from "src/app/modules/lead/service/lead.service";
import { ConfirmationDialogComponent } from "src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-customer-dialog",
  templateUrl: "./customer-list-dialog.component.html",
  styleUrls: ["./customer-list-dialog.component.scss"],
})
export class CustomerListDialogComponent implements OnInit {
  public errorMessage: string;
  public columns: string[] = [
    "customerId",
    "name",
    "mobileNo",
    "gender",
    "occupation",
    "status",
    "address",
  ];
  public dataSource: MatTableDataSource<ICustomer>;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private leadService: LeadService
  ) {}

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  select(customer: ICustomer) {
    if (this.data.from === "LEAD") {
      this.leadService.getLeadsCountByCustomerId(customer.customerId).subscribe(
        (data) => {
          if (data > 0) {
            this.dialog.open(ConfirmationDialogComponent, {
              data: {
                title: "Lead exists",
                subtitle:
                  "This customer is already associated with other lead.",
              },
            });
          } else {
            this.dialogRef.close(customer);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.dialogRef.close(customer);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
