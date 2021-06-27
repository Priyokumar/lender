import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAccount, IAccountQueryParams } from 'src/app/modules/account/account.model';
import { AccountService } from 'src/app/modules/account/service/account.service';

@Component({
  selector: 'app-account-list-dialog',
  templateUrl: './account-list-dialog.component.html',
  styleUrls: ['./account-list-dialog.component.scss']
})
export class AccountListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['accountNo', 'customerName', 'productName', 'amount', 'interest', 'frequency', 'tenure', 'status'];
  public dataSource: MatTableDataSource<IAccount>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<AccountListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAccountQueryParams
  ) { }

  ngOnInit() {
    this.getAllAccounts();
  }

  getAllAccounts() {

    let params: IAccountQueryParams = null;

    if(this.data.status){
      params  = {
        status:this.data.status
      }
    }

    this.accountService.getAllAccounts(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  select(account: IAccount){
    this.dialogRef.close(account);
  }

 close(){
   this.dialogRef.close();
 }


}


