import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentReportService } from '../payment-report.service';

@Component({
  selector: 'app-payment-report-dialog',
  templateUrl: './payment-report-dialog.component.html',
  styleUrls: ['./payment-report-dialog.component.scss']
})
export class PaymentReportDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<PaymentReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    private _snackBar:MatSnackBar,
    public PaymentReportService:PaymentReportService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      fullName:[{value: '', disabled: true}, Validators.required],
      email:[{value: '', disabled: true}, Validators.required],
      phone:[{value: '', disabled: true}, Validators.required],
      amount:[{value: '', disabled: true}, Validators.required],
      selectedBank:[{value: '', disabled: true}, Validators.required],
      accountNo:[{value: '', disabled: true}, Validators.required],
      userId:[{value: '', disabled: true}, Validators.required],
      reportedOn:[{value: '', disabled: true}, Validators.required]
    });

     this.form.patchValue(this.data.PaymentReport);
     this.form.patchValue({
      reportedOn:this.data.PaymentReport.reportedOn.toDate()
     });
  }

  public async onSubmit(){
    console.log()
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}

