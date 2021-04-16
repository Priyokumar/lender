import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genders, LeadStatuses, ProductType, ProductTypes, YesNo } from 'src/app/constant';
import { ICustomer } from 'src/app/modules/customer/customer.model';
import { IProduct } from 'src/app/modules/product/product.model';
import { ProductService } from 'src/app/modules/product/service/product.service';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ILead } from '../../lead.model';
import { LeadService } from '../../service/lead.service';
import { CustomerListDialogComponent } from 'src/app/modules/dialog/components/customer-list-dialog/customer-list-dialog.component';
import { ProductListDialogComponent } from 'src/app/modules/dialog/components/product-list-dialog/product-list-dialog.component';

@Component({
  selector: 'app-lead-create-edit',
  templateUrl: './lead-create-edit.component.html',
  styleUrls: ['./lead-create-edit.component.scss']
})
export class LeadCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  statuses = LeadStatuses;
  genders = Genders;
  productType = ProductType;

  idCtrl = new FormControl('', null);
  leadIdCtrl = new FormControl();
  requestedAmountCtrl = new FormControl('', Validators.required);
  monthlyInterestCtrl = new FormControl();
  interestCtrl = new FormControl('', Validators.required);
  frequencyCtrl = new FormControl('', Validators.required);
  emiCtrl = new FormControl();
  statusCtrl = new FormControl('', Validators.required);
  tenureCtrl = new FormControl('', Validators.required);
  productNameCtrl = new FormControl('', Validators.required);
  customerNameCtrl = new FormControl('', Validators.required);
  customerIdCtrl = new FormControl('', Validators.required);
  genderCtrl = new FormControl('', Validators.required);
  mobileNoCtrl = new FormControl('', Validators.required);

  securedProduct = false;
  yesNo = YesNo;

  selectedProduct: IProduct;
  selectedCustomer: ICustomer;

  errorMessage: any;

  constructor(
    private leadService: LeadService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      leadIdCtrl: this.leadIdCtrl,
      requestedAmountCtrl: this.requestedAmountCtrl,
      monthlyInterestCtrl: this.monthlyInterestCtrl,
      interestCtrl: this.interestCtrl,
      frequencyCtrl: this.frequencyCtrl,
      emiCtrl: this.emiCtrl,
      statusCtrl: this.statusCtrl,
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
        this.getLeadById();
      }
    });

    this.leadIdCtrl.disable();
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

    this.requestedAmountCtrl.valueChanges.subscribe(data => {
      this.calculateInterest();
    });
    this.tenureCtrl.valueChanges.subscribe(data => {
      this.calculateInterest();
    });

  }

  ngOnInit() {
  }


  getLeadById() {
    this.leadService.getLeadById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  private setForm(lead: ILead) {

    this.idCtrl.setValue(lead.id);
    this.leadIdCtrl.setValue(lead.leadId);
    this.requestedAmountCtrl.setValue(lead.requestedAmount);
    this.monthlyInterestCtrl.setValue(lead.monthlyInterest);
    this.emiCtrl.setValue(lead.emi);
    this.statusCtrl.setValue(lead.status);
    this.tenureCtrl.setValue(lead.tenure);



    if (lead.product) {
      this.interestCtrl.setValue(lead.product.interest);
      this.securedProduct = lead.product.securedProduct;
      this.frequencyCtrl.setValue(lead.product.frequency);
      this.productNameCtrl.setValue(lead.product.name);
      this.selectedProduct = lead.product;
    }

    if (lead.customer) {
      this.customerNameCtrl.setValue(lead.customer.name);
      this.customerIdCtrl.setValue(lead.customer.customerId);
      this.genderCtrl.setValue(lead.customer.gender);
      this.mobileNoCtrl.setValue(lead.customer.mobileNo);
      this.selectedCustomer = lead.customer;
    }

  }

  private saveOrUpdateHttpObservable(payload: ILead): Observable<IActionResponse> {

    if (this.id) {
      return this.leadService.updateLead(payload, this.id);
    } else {
      return this.leadService.createLead(payload);
    }
  }

  public save() {

    const payload: ILead = {
      id: this.id,
      leadId: this.leadIdCtrl.value,
      customer: this.selectedCustomer,
      emi: this.emiCtrl.value,
      monthlyInterest: this.monthlyInterestCtrl.value,
      product: this.selectedProduct,
      requestedAmount: this.requestedAmountCtrl.value,
      status: this.statusCtrl.value,
      tenure: this.tenureCtrl.value
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

      this.router.navigate(['/leads']);

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

  selectCustomer() {
    this.dialog.open(CustomerListDialogComponent, { width: "65%" }).afterClosed().subscribe(customer => {
      if (customer) {
        this.selectedCustomer = customer;
        this.customerNameCtrl.setValue(customer.name);
        this.customerIdCtrl.setValue(customer.customerId);
        this.genderCtrl.setValue(customer.gender);
        this.mobileNoCtrl.setValue(customer.mobileNo);
      }
    });
  }

  selectProduct() {
    this.dialog.open(ProductListDialogComponent, { width: "65%" }).afterClosed().subscribe(product => {
      if (product) {
        this.selectedProduct = product;
        this.interestCtrl.setValue(product.interest);
        this.securedProduct = product.securedProduct;
        this.frequencyCtrl.setValue(product.frequency);
        this.productNameCtrl.setValue(product.name);
        this.calculateInterest();

        if (this.selectedProduct.type === ProductType.LOAN) {
         
          this.monthlyInterestCtrl.setValue(null);
          this.monthlyInterestCtrl.clearValidators();
          this.tenureCtrl.setValidators(Validators.required);
          this.emiCtrl.setValidators(Validators.required);
       
        } else if (this.selectedProduct.type === ProductType.SENDOI) {
         
          this.tenureCtrl.setValue(null);
          this.emiCtrl.setValue(null);
          this.tenureCtrl.clearValidators();
          this.emiCtrl.clearValidators();
          this.tenureCtrl.updateValueAndValidity();
          this.emiCtrl.updateValueAndValidity();
          this.monthlyInterestCtrl.setValidators(Validators.required);

        }
      }
    });
  }

  calculateInterest() {
    if (!this.selectedProduct || !this.requestedAmountCtrl.value) {
      return;
    }

    if (this.selectedProduct.type === ProductType.LOAN) {

      if (!this.tenureCtrl.value) {
        return;
      }

      const monInt = parseFloat(this.requestedAmountCtrl.value) * (parseFloat(this.interestCtrl.value) / 100);

      const p = parseFloat(this.requestedAmountCtrl.value);
      const rInyear = parseFloat(this.interestCtrl.value);
      const n = parseFloat(this.tenureCtrl.value);
      const r = rInyear/(100 * 12);

      const emi = p * r * ((Math.pow((1 + r), n)) / ((Math.pow((1 + r), n)) - 1));

      this.emiCtrl.setValue(emi);

    } else if (this.selectedProduct.type === ProductType.SENDOI) {
      const monInt = parseFloat(this.requestedAmountCtrl.value) * (parseFloat(this.interestCtrl.value) / 100) ;
      this.monthlyInterestCtrl.setValue(monInt);
    }

  }

}
 