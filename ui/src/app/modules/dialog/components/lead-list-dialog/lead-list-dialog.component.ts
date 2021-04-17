import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { LeadStatus } from 'src/app/constant';
import { ILead } from 'src/app/modules/lead/lead.model';
import { LeadService } from 'src/app/modules/lead/service/lead.service';

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-list-dialog.component.html',
  styleUrls: ['./lead-list-dialog.component.scss']
})
export class LeadListDialogComponent implements OnInit {

  public errorMessage: string;
  public columns: string[] = ['leadId', 'customerName', 'productName', 'interest', 'requestAmount','tenure', 'status'];
  public dataSource: MatTableDataSource<ILead>;

  constructor(
    private leadService: LeadService,
    public dialogRef: MatDialogRef<LeadListDialogComponent>
  ) { }

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    this.leadService.getLeads({status: LeadStatus.QUALIFIED}).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log(error);
    })
  }

  select(lead: ILead) {
    this.dialogRef.close(lead);
  }

  close() {
    this.dialogRef.close();
  }

}
