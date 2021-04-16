import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CustomerService } from 'src/app/modules/customer/service/customer.service';
import { ProductService } from 'src/app/modules/product/service/product.service';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarInfoComponent } from 'src/app/modules/shared/components/snackbar-info/snackbar-info.component';
import { IConfirmation, SnackBarConfig } from 'src/app/modules/shared/model/shared.model';
import { ILead } from '../../lead.model';
import { LeadService } from '../../service/lead.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['leadId', 'customerName', 'productName', 'interest', 'frequency', 'tenure', 'status', 'action'];
  public dataSource: MatTableDataSource<ILead>;

  constructor(
   
    private leadService: LeadService,
    
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllLeads();
  }

  getAllLeads() {
    this.leadService.getAllLeads().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  delete(id: number) {

    const confirmationData: IConfirmation = {
      title: 'Delete Lead',
      subtitle: 'Are you really sure to delete this record?'
    };

    this.dialog.open(ConfirmationDialogComponent, { width: '26%', data: confirmationData, disableClose: true })
      .afterClosed().subscribe(okData => {
        if (okData) {
          this.leadService.deleteLead(id).subscribe(data => {
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
            this.getAllLeads();
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
