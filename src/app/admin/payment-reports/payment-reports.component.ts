import { Component, OnInit } from '@angular/core';
import { PaymentReport } from './payment-report';
import { PaymentReportService } from './payment-report.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PaymentReportDialogComponent } from './payment-report-dialog/payment-report-dialog.component';

@Component({
  selector: 'app-payment-reports',
  templateUrl: './payment-reports.component.html',
  styleUrls: ['./payment-reports.component.scss']
})
export class PaymentReportsComponent implements OnInit {

  searchKey:string=''
  searchList:PaymentReport[]=[]
  public settings:Settings;
  constructor(public PaymentReportService:PaymentReportService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.PaymentReportService.getPaymentReports()
  }

  getAllPaymentReports(){
    if(this.searchKey!==''){
      this.searchList= this.PaymentReportService.PaymentReportList.filter(x=>x.fullName.toLowerCase().includes(this.searchKey.toLowerCase()))
      return this.searchList
     }
    return this.PaymentReportService.PaymentReportList
  }


  public openPaymentReportDialog(data:any,isNew:boolean){let name='';
  const dialogRef = this.dialog.open(PaymentReportDialogComponent, {
    data: {
      PaymentReport:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(PaymentReport => {
    if(PaymentReport){
      const index: number = this.getAllPaymentReports().findIndex(x => x.id == PaymentReport.id);
        console.log(index)
        if(index !== -1){
          this.PaymentReportService.updatePaymentReport(PaymentReport)
          this.getAllPaymentReports()[index] = PaymentReport
          this.openSnackBar("PaymentReport information updated successfully","ok")
          return
        }
        else{
          this.getAllPaymentReports().push(PaymentReport)
          this.PaymentReportService.addPaymentReport(PaymentReport)
          this.openSnackBar("New PaymentReport has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(PaymentReport:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this PaymentReport?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllPaymentReports().indexOf(PaymentReport);
      if (index !== -1) {
        this.PaymentReportService.deletePaymentReport(PaymentReport.id)
        this.getAllPaymentReports().splice(index, 1)
      }
    }
  });
}

 openSnackBar(message:string, action:string){
  this._snackBar.open(message,action)
 }

 public page: any;
 public count = 6;
 public onPageChanged(event){
  this.page = event;
  window.scrollTo(0,0);
}
}
