import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RepaymentStatuses } from "src/app/constant";
import { IAccount } from "src/app/modules/account/account.model";
import { IRepayment } from "src/app/modules/repayment/repayment.model";
import { RepaymentService } from "src/app/modules/repayment/service/repayment.service";
import { SnackbarInfoComponent } from "src/app/modules/shared/components/snackbar-info/snackbar-info.component";
import { SnackBarConfig } from "src/app/modules/shared/model/shared.model";

@Component({
  selector: "app-repayment-dialog",
  templateUrl: "./repayment-dialog.component.html",
  styleUrls: ["./repayment-dialog.component.scss"],
})
export class RepaymentDialogComponent implements OnInit {
  amountPaidCtrl = new FormControl("", Validators.required);
  dueAmountCtrl = new FormControl("", Validators.required);
  statusCtrl = new FormControl("", Validators.required);
  dateOfPaymentCtrl = new FormControl("", Validators.required);

  repaymentStatuses = RepaymentStatuses;

  constructor(
    public dialogRef: MatDialogRef<RepaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
    private repaymentService: RepaymentService,
    private snackbar: MatSnackBar
  ) {
    this.amountPaidCtrl.valueChanges.subscribe((_) => {
      this.calculateDueAmount();
    });
  }

  ngOnInit() {
    this.dueAmountCtrl.disable();
    this.amountPaidCtrl.setValue(this.data.lead.monthlyInterest);
  }

  calculateDueAmount() {
    const amountPaid = parseFloat(this.amountPaidCtrl.value);

    if (!this.data || !this.data.lead || !this.data.lead.monthlyInterest) {
      return;
    }
    const monthlyInterest = this.data.lead.monthlyInterest;

    if (amountPaid > monthlyInterest) {
      this.amountPaidCtrl.setValue(monthlyInterest);
      return;
    }
    let dueAmount = monthlyInterest - amountPaid;
    if (amountPaid === monthlyInterest) {
      dueAmount = 0;
    }
    this.dueAmountCtrl.setValue(dueAmount);
  }

  public repay() {
    const payload: IRepayment = {
      id: null,
      status: this.statusCtrl.value,
      account: this.data,
      amountPaid: this.amountPaidCtrl.value,
      dateOfPayment: this.dateOfPaymentCtrl.value,
      dueAmount: this.dueAmountCtrl.value,
    };

    this.repaymentService.createRepayment(payload).subscribe(
      (data) => {
        this.dialogRef.close();
        this.snackbar.openFromComponent(
          SnackbarInfoComponent,
          {
            data: SnackBarConfig.successData("Repayment has been added successfully."),
            ...SnackBarConfig.flashTopSuccessSnackBar()
          });
      },
      (error) => {
        console.error(error);
        let errorMessage = "";
        if (error.error && error.error.apiMessage) {
          errorMessage = error.error.apiMessage.detail;
        } else {
          errorMessage = error.message;
        }
        this.snackbar.openFromComponent(SnackbarInfoComponent, {
          data: SnackBarConfig.dangerData(errorMessage),
          ...SnackBarConfig.flashTopDangerSnackBar(),
        });
      }
    );
  }
}
