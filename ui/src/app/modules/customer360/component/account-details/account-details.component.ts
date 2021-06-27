import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountStatus } from 'src/app/constant';
import { IAccount, IAccountQueryParams } from 'src/app/modules/account/account.model';
import { AccountService } from 'src/app/modules/account/service/account.service';
import { ICustomer } from 'src/app/modules/customer/customer.model';
import { RepaymentDialogComponent } from 'src/app/modules/dialog/components/repayment-dialog/repayment-dialog.component';
import { RepaymentListDialogComponent } from 'src/app/modules/dialog/components/repayment-list-dialog/repayment-list-dialog.component';

@Component({
  selector: '[account-details]',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnChanges {

  @Input() customer: ICustomer;
  accounts: IAccount[];
  accountStatus = AccountStatus;

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.customer) {
      this.getAccountsByCustomerId();
    }
  }

  ngOnInit() {
  }

  getAccountsByCustomerId() {
    const params: IAccountQueryParams = {
      customerId: this.customer.customerId
    }
    this.accountService.getAllAccounts(params).subscribe(data => {
      this.accounts = data;
    }, error => {
      console.log(error);
    })
  }

  viewRepaymentList(account: IAccount) {
    this.dialog.open(RepaymentListDialogComponent, { width: "65%", data: {
      accountNo: account.accountNo
    } });
  }

  repay(account: IAccount) {
    this.dialog.open(RepaymentDialogComponent, { width: "25%", data: account });
  }

}
