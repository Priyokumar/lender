import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from 'src/app/constant';
import { EmiListDialogComponent } from 'src/app/modules/dialog/components/emi-list-dialog/emi-list-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IAccount } from '../../account.model';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  id: number;
  account: IAccount;
  errorMessage: any;
  productType = ProductType;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getAccountById();
      }
    });
  }

  ngOnInit() {
  }

  getAccountById() {
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
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

  delete() {

    const confirmationData: IConfirmation = {
      title: 'Delete Account',
      subtitle: 'Are you really sure to delete this record?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.accountService.deleteAccount(this.id).subscribe(data => {
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
            this.router.navigate(["/accounts"]);
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

  viewEmiList() {
    this.dialog.open(EmiListDialogComponent, { width: "65%", data: this.account.accountNo });
  }

}
