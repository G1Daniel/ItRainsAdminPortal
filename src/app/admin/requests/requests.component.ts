import { Component, OnInit } from '@angular/core';
import { Request } from './request';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DonationsDialogComponent } from '../donations/donations-dialog/donations-dialog.component';
import { DonationsService } from '../donations/donations.service';
import { RequestsService } from './requests.service';
import { DonationTypeService } from '../donation-types/donation-type.service';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  searchKey:string=''
  searchList:Request[]=[]
  public settings:Settings;
  constructor(private companyService:CompanyService,private DonationService:DonationsService,public RequestService:RequestsService,private DonationTypeService:DonationTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.companyService.getCompanies()
    this.DonationService.getDonations()
    this.DonationTypeService.getDonationTypes()
    this.RequestService.getRequests()
  }

  getAllRequests(){
    return this.RequestService.RequestList
  }

  getDonationType(id:string){
    const donationType=this.DonationTypeService.donationTypesList.find(x=>x.id==id)
    return donationType!=null?donationType.name:'Not Found'
  }

  getCompany(id:string){
    const company=this.companyService.CompanyList.find(x=>x.id==id)
    return company!=null?company.name:'Not Found'
  }

  getDonation(id:string){
    const donation=this.DonationService.DonationList.find(x=>x.id==id)
    return donation!=null?donation:'Not Found'
  }
  public openRequestDialog(data:any){let name='';
  const dialogRef = this.dialog.open(RequestDialogComponent, {
    data: {
      Request:data,
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Request => {
  }
  );
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
