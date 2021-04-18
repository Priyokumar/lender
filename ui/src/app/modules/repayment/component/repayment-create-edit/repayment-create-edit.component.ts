import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountStatuses, Genders, ProductType, RepaymentStatuses } from 'src/app/constant';
import { IAccount, IEmi } from 'src/app/modules/account/account.model';
import { AccountListDialogComponent } from 'src/app/modules/dialog/components/account-list-dialog/account-list-dialog.component';
import { EmiListDialogComponent } from 'src/app/modules/dialog/components/emi-list-dialog/emi-list-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IRepayment } from '../../repayment.model';
import { RepaymentService } from '../../service/repayment.service';

@Component({
  selector: 'app-repayment-create-edit',
  templateUrl: './repayment-create-edit.component.html',
  styleUrls: ['./repayment-create-edit.component.scss']
})
export class RepaymentCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  repaymentStatuses = RepaymentStatuses;
  genders = Genders;
  productType = ProductType;

  idCtrl = new FormControl('', null);
  repaymentIdCtrl = new FormControl('');
  dateOfPaymentCtrl = new FormControl('', Validators.required);
  amountPaidCtrl = new FormControl('', Validators.required);
  dueAmountCtrl = new FormControl('', Validators.required);
  statusCtrl = new FormControl('', Validators.required);

  accountNoCtrl = new FormControl();
  requestedAmountCtrl = new FormControl();
  monthlyInterestCtrl = new FormControl();
  tenureCtrl = new FormControl();

  productNameCtrl = new FormControl();
  interestCtrl = new FormControl();
  frequencyCtrl = new FormControl();

  emiAmountCtrl = new FormControl();
  emiDueDateCtrl = new FormControl();
  emiStatusCtrl = new FormControl();

  customerNameCtrl = new FormControl();
  genderCtrl = new FormControl();
  selectedAccount: IAccount;
  errorMessage: any;

  constructor(
    private repaymentService: RepaymentService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      repaymentIdCtrl: this.repaymentIdCtrl,
      dateOfPaymentCtrl: this.dateOfPaymentCtrl,
      amountPaidCtrl: this.amountPaidCtrl,
      dueAmountCtrl: this.dueAmountCtrl,
      statusCtrl: this.statusCtrl,

      accountNoCtrl: this.accountNoCtrl,
      requestedAmountCtrl: this.requestedAmountCtrl,
      monthlyInterestCtrl: this.monthlyInterestCtrl,
      tenureCtrl: this.tenureCtrl,
      productNameCtrl: this.productNameCtrl,
      interestCtrl: this.interestCtrl,
      frequencyCtrl: this.frequencyCtrl,
      customerNameCtrl: this.customerNameCtrl,
      genderCtrl: this.genderCtrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getRepaymentById();
      }
    });

    this.repaymentIdCtrl.disable();
    this.accountNoCtrl.disable();
    this.requestedAmountCtrl.disable();
    this.monthlyInterestCtrl.disable();
    this.emiAmountCtrl.disable();
    this.emiDueDateCtrl.disable();
    this.emiStatusCtrl.disable();
    this.tenureCtrl.disable();
    this.productNameCtrl.disable();
    this.interestCtrl.disable();
    this.frequencyCtrl.disable();
    this.customerNameCtrl.disable();
    this.genderCtrl.disable();
    this.dueAmountCtrl.setValue(0);
    this.amountPaidCtrl.setValue(0);
    this.dueAmountCtrl.disable();

    this.amountPaidCtrl.valueChanges.subscribe(_ => {
      this.calculateDueAmount();
    })

  }

  ngOnInit() {
  }

  getRepaymentById() {
    this.repaymentService.getRepaymentById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  private setForm(repayment: IRepayment) {

    this.idCtrl.setValue(repayment.id);
    this.repaymentIdCtrl.setValue(repayment.repaymentId);
    this.dateOfPaymentCtrl.setValue(new Date(repayment.dateOfPayment));
    this.amountPaidCtrl.setValue(repayment.amountPaid);
    this.dueAmountCtrl.setValue(repayment.dueAmount);
    this.statusCtrl.setValue(repayment.status);

    if (repayment.account) {
      this.selectedAccount = repayment.account;
      this.accountNoCtrl.setValue(repayment.account.accountNo);
      this.requestedAmountCtrl.setValue(repayment.account.lead.requestedAmount);
      this.monthlyInterestCtrl.setValue(repayment.account.lead.monthlyInterest);
      this.tenureCtrl.setValue(repayment.account.lead.tenure);
    }

    if (repayment.account.lead.product) {
      this.productNameCtrl.setValue(repayment.account.lead.product.name);
      this.interestCtrl.setValue(repayment.account.lead.product.interest);
      this.frequencyCtrl.setValue(repayment.account.lead.product.frequency);
    }

    if (repayment.account.lead.customer) {
      this.customerNameCtrl.setValue(repayment.account.lead.customer.name);
      this.genderCtrl.setValue(repayment.account.lead.customer.gender);
    }

  }

  private saveOrUpdateHttpObservable(payload: IRepayment): Observable<IActionResponse> {

    if (this.id) {
      return this.repaymentService.updateRepayment(payload, this.id);
    } else {
      return this.repaymentService.createRepayment(payload);
    }
  }

  public save() {

    const payload: IRepayment = {
      id: this.id,
      status: this.statusCtrl.value,
      account: this.selectedAccount,
      amountPaid: this.amountPaidCtrl.value,
      dateOfPayment: this.dateOfPaymentCtrl.value,
      dueAmount: this.dueAmountCtrl.value,
      repaymentId: this.repaymentIdCtrl.value
    };

    this.saveOrUpdateHttpObservable(payload).subscribe(data => {

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

      this.router.navigate(['/repayments']);

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

  selectAccount() {

    this.dialog.open(AccountListDialogComponent, { width: "65%" }).afterClosed().subscribe(account => {
      if (account) {

        this.selectedAccount = account;

        this.accountNoCtrl.setValue(account.accountNo);
        this.requestedAmountCtrl.setValue(account.lead.requestedAmount);
        this.monthlyInterestCtrl.setValue(account.lead.monthlyInterest);
        this.tenureCtrl.setValue(account.lead.tenure);

        if (account.lead.product) {
          this.productNameCtrl.setValue(account.lead.product.name);
          this.interestCtrl.setValue(account.lead.product.interest);
          this.frequencyCtrl.setValue(account.lead.product.frequency);
        }

        if (account.lead.customer) {
          this.customerNameCtrl.setValue(account.lead.customer.name);
          this.genderCtrl.setValue(account.lead.customer.gender);
        }
      }

    });
  }

  calculateDueAmount() {

    const amountPaid = parseInt(this.amountPaidCtrl.value);

  }

  selectEmi() {
    this.dialog.open(EmiListDialogComponent, {
      width: "65%", data: {
        accountNo: this.selectedAccount.accountNo,
        selectable: true
      }
    }).afterClosed().subscribe(emi => {
      if (emi) {
        this.emiAmountCtrl.setValue(emi.emiAmount);
        this.emiDueDateCtrl.setValue(emi.dueDate);
        this.emiStatusCtrl.setValue(emi.status);
      }
    });
  }

}
