import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterestFrequencies, ProductTypes, YesNo } from 'src/app/constant';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IProduct } from '../../product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.scss']
})
export class ProductCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;

  yesNo = YesNo;
  types = ProductTypes;
  interestFrequencies = InterestFrequencies;

  idCtrl = new FormControl('', null);
  nameCtrl = new FormControl('', Validators.required);
  productIdCtrl = new FormControl();
  typeCtrl = new FormControl('', Validators.required);
  interestCtrl = new FormControl('', Validators.required);
  frequencyCtrl = new FormControl('', Validators.required);
  errorMessage: any;
  securedProduct = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      nameCtrl: this.nameCtrl,
      productIdCtrl: this.productIdCtrl,
      typeCtrl: this.typeCtrl,
      interestCtrl: this.interestCtrl,
      frequencyCtrl: this.frequencyCtrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getProductById();
      }
    });

    this.productIdCtrl.disable();

  }

  ngOnInit() {
  }

  getProductById() {
    this.productService.getProductById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  private setForm(product: IProduct) {

    this.idCtrl.setValue(product.id);
    this.nameCtrl.setValue(product.name);
    this.productIdCtrl.setValue(product.productId);
    this.typeCtrl.setValue(product.type);
    this.interestCtrl.setValue(product.interest);
    this.securedProduct = product.securedProduct;
    this.frequencyCtrl.setValue(product.frequency);

  }

  private saveOrUpdateHttpObservable(payload: IProduct): Observable<IActionResponse> {

    if (this.id) {
      return this.productService.updateProduct(payload, this.id);
    } else {
      return this.productService.createProduct(payload);
    }
  }

  public save() {

    const payload: IProduct = {
      id: this.id,
      name: this.nameCtrl.value,
      productId: this.productIdCtrl.value,
      type: this.typeCtrl.value,
      interest: this.interestCtrl.value,
      securedProduct: this.securedProduct,
      frequency: this.frequencyCtrl.value
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

      this.router.navigate(['/products']);

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
