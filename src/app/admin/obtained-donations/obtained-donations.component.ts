import { Component, OnInit } from '@angular/core';
import { ObtainedDonation } from './obtained-donation';
import { DonationsService } from '../donations/donations.service';
import { ObtainedDonationService } from './obtained-donation.service';
import { DonationTypeService } from '../donation-types/donation-type.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-obtained-donations',
  templateUrl: './obtained-donations.component.html',
  styleUrls: ['./obtained-donations.component.scss']
})
export class ObtainedObtainedDonationsComponent implements OnInit {

  searchKey:string=''
  searchList:ObtainedDonation[]=[]
  public settings:Settings;
  constructor(private DonationService:DonationsService,public ObtainedDonationService:ObtainedDonationService,private DonationTypeService:DonationTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.DonationService.getDonations()
    this.DonationTypeService.getDonationTypes()
    this.ObtainedDonationService.getObtainedDonations()
  }

  getAllObtainedDonations(){
    return this.ObtainedDonationService.ObtainedDonationList
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

