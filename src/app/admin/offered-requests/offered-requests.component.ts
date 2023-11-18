import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { DonationsService } from '../donations/donations.service';
import { ObtainedDonation } from '../obtained-donations/obtained-donation';
import { ObtainedDonationService } from '../obtained-donations/obtained-donation.service';
import { DonationTypeService } from '../donation-types/donation-type.service';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-offered-requests',
  templateUrl: './offered-requests.component.html',
  styleUrls: ['./offered-requests.component.scss']
})
export class OfferedRequestsComponent implements OnInit {

  searchKey:string=''
  searchList:ObtainedDonation[]=[]
  public settings:Settings;
  constructor(private companyService:CompanyService,private DonationService:DonationsService,public ObtainedDonationService:ObtainedDonationService,private DonationTypeService:DonationTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.companyService.getCompanies()
    this.DonationService.getDonations()
    this.DonationTypeService.getDonationTypes()
    this.ObtainedDonationService.getAllObtainedDonations()
  }


  getAllObtainedDonations(){
    return this.ObtainedDonationService.AllObtainedDonationList
  }

  getCompany(id:string){
    const company=this.companyService.CompanyList.find(x=>x.id==id)
    return company!=null?company.name:'Not Found'
  }
  getDonationType(id:string){
    const donationType=this.DonationTypeService.donationTypesList.find(x=>x.id==id)
    return donationType!=null?donationType.name:'Not Found'
  }

  getDonation(id:string){
    const donationType=this.DonationService.DonationList.find(x=>x.id==id)
    return donationType!=null?donationType:'Not Found'
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
