import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IRepayment } from '../../repayment.model';
import { RepaymentService } from '../../service/repayment.service';

@Component({
  selector: 'app-repayment-list',
  templateUrl: './repayment-list.component.html',
  styleUrls: ['./repayment-list.component.scss']
})
export class RepaymentListComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['repaymentId', 'accountNo', 'customerName', 'dateOfPayment', 'amountPaid', 'dueAmount', 'status', 'action'];
  public dataSource: MatTableDataSource<IRepayment>;

  constructor(
    private repaymentService: RepaymentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllRepayments();
  }

  getAllRepayments() {
    this.repaymentService.getAllRepayments().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  delete(id: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Repayment',
      subtitle: 'Are you really sure to delete this record?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.repaymentService.deleteRepayment(id).subscribe(data => {
            if (data.apiMessage && data.apiMessage.error) {
              this.snackBar.openFromComponent(
                SnackbarInfoComponent,
                {
                  data: SnackBarConfig.dangerData(data.apiMessage.detail),
                  ...SnackBarConfig.flashTopDangerSnackBar()
                });
              return;
            } else {
              this.snackBar.openFromComponent(
                SnackbarInfoComponent,
                {
                  data: SnackBarConfig.successData(data.apiMessage.detail),
                  ...SnackBarConfig.flashTopSuccessSnackBar()
                });
            }
            this.getAllRepayments();
          }, err => {
            console.error(err);
            if (err.error && err.error.apiMessage) {
              this.errorMessage = err.error.apiMessage.detail;
            } else {
              this.errorMessage = err.message;
            }
            this.snackBar.openFromComponent(
              SnackbarInfoComponent,
              {
                data: SnackBarConfig.dangerData(this.errorMessage),
                ...SnackBarConfig.flashTopDangerSnackBar()
              });
          });
        }
      });
  }

}
