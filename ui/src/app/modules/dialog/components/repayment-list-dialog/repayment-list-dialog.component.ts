import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IRepayment, IRepaymentParam } from 'src/app/modules/repayment/repayment.model';
import { RepaymentService } from 'src/app/modules/repayment/service/repayment.service';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { SnackBarConfig } from 'src/app/modules/shared/model/shared.model';

@Component({
  selector: 'app-repayment-list-dialog',
  templateUrl: './repayment-list-dialog.component.html',
  styleUrls: ['./repayment-list-dialog.component.scss']
})
export class RepaymentListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['repaymentId', 'accountNo', 'customerName', 'dateOfPayment', 'amountPaid', 'dueAmount', 'status'];
  public dataSource: MatTableDataSource<IRepayment>;

  constructor(
    public dialogRef: MatDialogRef<RepaymentListDialogComponent>,
    private repaymentService: RepaymentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getRepaymentsByAccount();
  }

  getRepaymentsByAccount() {

    let params : IRepaymentParam;

    if(this.data.accountNo){
      params = {
        accountNo: this.data.accountNo
      }
    }
    this.repaymentService.getAllRepayments(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
      if (error.error && error.error.apiMessage) {
        this.errorMessage = error.error.apiMessage.detail;
      } else {
        this.errorMessage = error.message;
      }
      this.snackBar.openFromComponent(
        SnackbarInfoComponent,
        {
          data: SnackBarConfig.dangerData(this.errorMessage),
          ...SnackBarConfig.flashTopDangerSnackBar()
        });
    })
  }

}
