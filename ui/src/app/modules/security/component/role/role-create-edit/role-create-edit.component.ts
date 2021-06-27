import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IRole } from '../../../security.model';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-create-edit',
  templateUrl: './role-create-edit.component.html',
  styleUrls: ['./role-create-edit.component.scss']
})
export class RoleCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;

  idCtrl = new FormControl('', null);
  nameCtrl = new FormControl('', Validators.required);
  descriptionCtrl = new FormControl('', Validators.required);
  errorMessage: any;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      nameCtrl: this.nameCtrl,
      descriptionCtrl: this.descriptionCtrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getRoleById();
      }
    });

   }

  ngOnInit() {
  }

  getRoleById(){
    this.roleService.getRoleById(this.id).subscribe(data=>{
      this.setForm(data);
    }, error=>{
      console.log(error);
    })
  }

  private setForm(role: IRole) {

    this.idCtrl.setValue(role.id);
    this.descriptionCtrl.setValue(role.desc);
    this.nameCtrl.setValue(role.name);

  }

  private saveOrUpdateHttpObservable(payload: IRole): Observable<IActionResponse> {

    if (this.id) {
      return this.roleService.updateRole(payload, this.id);
    } else {
      return this.roleService.createRole(payload);
    }
  }

  public save() {

    const payload: IRole = {
      desc: this.descriptionCtrl.value,
      id: this.id,
      name: this.nameCtrl.value,
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

      this.router.navigate(['/security/roles']);

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
