import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { IRole } from '../../../security.model';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['name', 'desc', 'action'];
  public dataSource: MatTableDataSource<IRole>;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    }, error=>{
      console.log(error);
    })
  }

  delete(id: number){

    const confirmationData: IConfirmation = {
      title: 'Delete role',
      subtitle: 'Are you really sure to delete this record?'
    };

    /* this.roleService.deleteRole(id).subscribe(data=>{

    }, error=>{
      console.log(error);
      
    }) */

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.roleService.deleteRole(id).subscribe(data => {
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
            this.getAllRoles();
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