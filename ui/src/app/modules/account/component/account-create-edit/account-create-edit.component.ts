import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountStatuses, Genders, LeadStatuses, ProductType, YesNo } from 'src/app/constant';
import { LeadListDialogComponent } from 'src/app/modules/dialog/components/lead-list-dialog/lead-list-dialog.component';
import { ILead } from 'src/app/modules/lead/lead.model';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IAccount } from '../../account.model';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-create-edit',
  templateUrl: './account-create-edit.component.html',
  styleUrls: ['./account-create-edit.component.scss']
})
export class AccountCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  accountStatuses = AccountStatuses;
  leadStatuses = LeadStatuses;
  genders = Genders;
  productType = ProductType;
  repaymentStartDate = new Date();

  idCtrl = new FormControl('', null);
  accountNoCtrl = new FormControl('', Validators.required);
  repaymentDateCtrl = new FormControl('', Validators.required);
  closingBalanceCtrl = new FormControl('', Validators.required);
  statusCtrl = new FormControl('', Validators.required);

  leadIdCtrl = new FormControl();
  requestedAmountCtrl = new FormControl('', Validators.required);
  monthlyInterestCtrl = new FormControl();
  emiCtrl = new FormControl();
  leadStatusCtrl = new FormControl('', Validators.required);
  tenureCtrl = new FormControl('', Validators.required);

  productNameCtrl = new FormControl('', Validators.required);
  interestCtrl = new FormControl('', Validators.required);
  frequencyCtrl = new FormControl('', Validators.required);

  customerNameCtrl = new FormControl('', Validators.required);
  customerIdCtrl = new FormControl('', Validators.required);
  genderCtrl = new FormControl('', Validators.required);
  mobileNoCtrl = new FormControl('', Validators.required);

  securedProduct = false;
  yesNo = YesNo;

  selectedLead: ILead;

  errorMessage: any;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      accountNoCtrl: this.accountNoCtrl,
      repaymentDateCtrl: this.repaymentDateCtrl,
      closingBalanceCtrl: this.closingBalanceCtrl,
      statusCtrl: this.statusCtrl,

      leadIdCtrl: this.leadIdCtrl,
      requestedAmountCtrl: this.requestedAmountCtrl,
      monthlyInterestCtrl: this.monthlyInterestCtrl,
      interestCtrl: this.interestCtrl,
      frequencyCtrl: this.frequencyCtrl,
      emiCtrl: this.emiCtrl,
      leadStatusCtrl: this.leadStatusCtrl,
      tenureCtrl: this.tenureCtrl,
      productNameCtrl: this.productNameCtrl,
      customerNameCtrl: this.customerNameCtrl,
      customerIdCtrl: this.customerIdCtrl,
      genderCtrl: this.genderCtrl,
      mobileNoCtrl: this.mobileNoCtrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getAccountById();
      }
    });

    this.accountNoCtrl.disable();
    this.closingBalanceCtrl.disable();

    this.leadIdCtrl.disable();
    this.requestedAmountCtrl.disable();
    this.monthlyInterestCtrl.disable();
    this.emiCtrl.disable();
    this.leadStatusCtrl.disable();
    this.tenureCtrl.disable();
    this.monthlyInterestCtrl.disable();
    this.frequencyCtrl.disable();
    this.emiCtrl.disable();
    this.productNameCtrl.disable();
    this.customerNameCtrl.disable();
    this.customerIdCtrl.disable();
    this.genderCtrl.disable();
    this.mobileNoCtrl.disable();
    this.interestCtrl.disable();
    this.tenureCtrl.setValue(0);
    this.repaymentDateCtrl.disable();

  }

  ngOnInit() {
  }


  getAccountById() {
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  private setForm(account: IAccount) {

    this.idCtrl.setValue(account.id);
    this.accountNoCtrl.setValue(account.accountNo);
    this.repaymentDateCtrl.setValue(new Date(account.repaymentDate));
    this.closingBalanceCtrl.setValue(account.closingBalance);
    this.statusCtrl.setValue(account.status);


    if (account.lead) {
      this.selectedLead = account.lead;
      this.leadIdCtrl.setValue(account.lead.leadId);
      this.requestedAmountCtrl.setValue(account.lead.requestedAmount);
      this.monthlyInterestCtrl.setValue(account.lead.monthlyInterest);
      this.emiCtrl.setValue(account.lead.emi);
      this.leadStatusCtrl.setValue(account.lead.status);
      this.tenureCtrl.setValue(account.lead.tenure);
    }

    if (account.lead.product) {
      this.interestCtrl.setValue(account.lead.product.interest);
      this.securedProduct = account.lead.product.securedProduct;
      this.frequencyCtrl.setValue(account.lead.product.frequency);
      this.productNameCtrl.setValue(account.lead.product.name);
    }

    if (account.lead.customer) {
      this.customerNameCtrl.setValue(account.lead.customer.name);
      this.customerIdCtrl.setValue(account.lead.customer.customerId);
      this.genderCtrl.setValue(account.lead.customer.gender);
      this.mobileNoCtrl.setValue(account.lead.customer.mobileNo);
    }

  }

  private saveOrUpdateHttpObservable(payload: IAccount): Observable<IActionResponse> {

    if (this.id) {
      return this.accountService.updateAccount(payload, this.id);
    } else {
      return this.accountService.createAccount(payload);
    }
  }

  public save() {

    const payload: IAccount = {
      id: this.id,
      status: this.statusCtrl.value,
      accountNo: this.accountNoCtrl.value,
      closingBalance: this.closingBalanceCtrl.value,
      emis: [],
      lead: this.selectedLead,
      repaymentDate: this.repaymentDateCtrl.value
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

      this.router.navigate(['/accounts']);

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

  selectLead() {
    this.dialog.open(LeadListDialogComponent, { width: "65%" }).afterClosed().subscribe(lead => {
      if (lead) {

        this.selectedLead = lead;

        this.leadIdCtrl.setValue(lead.leadId);
        this.requestedAmountCtrl.setValue(lead.requestedAmount);
        this.monthlyInterestCtrl.setValue(lead.monthlyInterest);
        this.emiCtrl.setValue(lead.emi);
        this.leadStatusCtrl.setValue(lead.status);
        this.tenureCtrl.setValue(lead.tenure);
        if (lead.product) {
          this.interestCtrl.setValue(lead.product.interest);
          this.securedProduct = lead.product.securedProduct;
          this.frequencyCtrl.setValue(lead.product.frequency);
          this.productNameCtrl.setValue(lead.product.name);
        }

        if (lead.customer) {
          this.customerNameCtrl.setValue(lead.customer.name);
          this.customerIdCtrl.setValue(lead.customer.customerId);
          this.genderCtrl.setValue(lead.customer.gender);
          this.mobileNoCtrl.setValue(lead.customer.mobileNo);
        }
      }

    });
  }

}
