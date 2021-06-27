import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEmi } from 'src/app/modules/account/account.model';
import { EmiService } from 'src/app/modules/account/service/emi.service';

@Component({
  selector: 'app-emi-list-dialog',
  templateUrl: './emi-list-dialog.component.html',
  styleUrls: ['./emi-list-dialog.component.scss']
})
export class EmiListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['emiAmount', 'dueDate', 'status'];
  public dataSource: MatTableDataSource<IEmi>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<EmiListDialogComponent>,
    private emiService: EmiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getEmiList();
  }

  getEmiList() {

    this.emiService.getEmiList(this.data.accountNo).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    })
  }

  close() {
    this.dialogRef.close();
  }

  select(emi: IEmi) {
    if (!this.data.selectable) {
      return;
    }
    this.dialogRef.close(emi);
  }

}
