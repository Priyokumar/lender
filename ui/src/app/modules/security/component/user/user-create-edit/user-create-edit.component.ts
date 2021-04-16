import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genders, Statuses } from 'src/app/constant';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IActionResponse, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IRole, IUser } from '../../../security.model';
import { RoleService } from '../../../service/role.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  statuses  =  Statuses;
  genders  =  Genders;

  idCtrl = new FormControl('', null);
  nameCtrl = new FormControl('', Validators.required);
  emailCtrl = new FormControl('', Validators.required);
  mobileNoCtrl = new FormControl('', Validators.required);
  genderCtrl = new FormControl('', Validators.required);
  statusCtrl = new FormControl('', Validators.required);
  rolesFctrl = new FormControl();
  errorMessage: any;
  roles: IRole[];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
  ) {

    this.form = new FormGroup({
      idCtrl: this.idCtrl,
      nameCtrl: this.nameCtrl,
      emailCtrl: this.emailCtrl,
      mobileNoCtrl: this.mobileNoCtrl,
      genderCtrl: this.genderCtrl,
      statusCtrl: this.statusCtrl,
      rolesFctrl: this.rolesFctrl
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getUserById();
      }
    });

  }

  ngOnInit() {
    this. getRoles();
  }

  getUserById() {
    this.userService.getUserById(this.id).subscribe(data => {
      this.setForm(data);
    }, error => {
      console.log(error);
    })
  }

  getRoles() {

    this.roleService.getAllRoles().subscribe(data => {
      this.roles = data;
    }, err => {
      console.error(err);
    });
  }

  private setForm(user: IUser) {

    this.idCtrl.setValue(user.id);
    this.nameCtrl.setValue(user.name);
    this.emailCtrl.setValue(user.email);
    this.mobileNoCtrl.setValue(user.mobile);
    this.genderCtrl.setValue(user.gender);
    this.statusCtrl.setValue(user.status);

    if (user.roles) {
      const roles = user.roles.map(ele => { return ele.id });
      this.rolesFctrl.setValue(roles);
    }

  }

  private saveOrUpdateHttpObservable(payload: IUser): Observable<IActionResponse> {

    if (this.id) {
      return this.userService.updateUser(payload, this.id);
    } else {
      return this.userService.createUser(payload);
    }
  }

  public save() {

    const payload: IUser = {
      id: this.id,
      name: this.nameCtrl.value,
      email: this.emailCtrl.value,
      gender: this.genderCtrl.value,
      mobile: this.mobileNoCtrl.value,
      roles: [],
      status: this.statusCtrl.value
    };

    const roleIds = this.rolesFctrl.value;

    if (roleIds) {
      payload.roles = roleIds.map(ele => {
        return this.roles.find(des => {
          return des.id === parseInt(ele);
        })
      })
    }

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

      this.router.navigate(['/security/users']);

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
