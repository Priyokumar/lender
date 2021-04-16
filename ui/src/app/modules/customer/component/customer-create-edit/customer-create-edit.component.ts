import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Statuses, Genders } from 'src/app/constant';
import { IRole, IUser } from 'src/app/modules/security/security.model';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ICustomer } from '../../customer.model';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-create-edit',
  templateUrl: './customer-create-edit.component.html',
  styleUrls: ['./customer-create-edit.component.scss']
})
export class CustomerCreateEditComponent implements OnInit {
 
  form: FormGroup;
  id: number;
  statuses  =  Statuses;
  genders  =  Genders;

  idCtrl = new FormControl('', null);
  nameCtrl = new FormControl('', Validators.required);
  customerIdCtrl = new FormControl();
  mobileNoCtrl = new FormControl('', Validators.required);
  genderCtrl = new FormControl('', Validators.required);
  statusCtrl = new FormControl('', Validators.required);
  occupationCtrl = new FormControl();
  addressCtrl = new FormControl();
  errorMessage: any;
  roles: IRole[];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      nameCtrl: this.nameCtrl,
      customerIdCtrl: this.customerIdCtrl,
      mobileNoCtrl: this.mobileNoCtrl,
      genderCtrl: this.genderCtrl,
      statusCtrl: this.statusCtrl,
      occupationCtrl: this.occupationCtrl,
      addressCtrl: this.addressCtrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getCustomerById();
      }
    });

    this.customerIdCtrl.disable();

  }

  ngOnInit() {
  }

  getCustomerById() {
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  private setForm(customer: ICustomer) {

    this.idCtrl.setValue(customer.id);
    this.nameCtrl.setValue(customer.name);
    this.customerIdCtrl.setValue(customer.customerId);
    this.mobileNoCtrl.setValue(customer.mobileNo);
    this.genderCtrl.setValue(customer.gender);
    this.statusCtrl.setValue(customer.status);
    this.occupationCtrl.setValue(customer.occupation);
    this.addressCtrl.setValue(customer.address);

  }

  private saveOrUpdateHttpObservable(payload: ICustomer): Observable<IActionResponse> {

    if (this.id) {
      return this.customerService.updateCustomer(payload, this.id);
    } else {
      return this.customerService.createCustomer(payload);
    }
  }

  public save() {

    const payload: ICustomer = {
      id: this.id,
      name: this.nameCtrl.value,
      gender: this.genderCtrl.value,
      mobileNo: this.mobileNoCtrl.value,
      status: this.statusCtrl.value,
      customerId: this.customerIdCtrl.value,
      occupation: this.occupationCtrl.value,
      address: this.addressCtrl.value
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

      this.router.navigate(['/customers']);

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

}
