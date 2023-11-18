import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Settings,AppSettings } from 'src/app/app.settings';
import { DeliveryTypeService } from '../delivery-types/delivery-type.service';
import { DonationTypeService } from '../donation-types/donation-type.service';
import { Donation } from '../donations/donation';
import { DonationStatus } from '../donations/donation-status.enum';
import { DonationsDialogComponent } from '../donations/donations-dialog/donations-dialog.component';
import { DonationsService } from '../donations/donations.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-available-donations',
  templateUrl: './available-donations.component.html',
  styleUrls: ['./available-donations.component.scss']
})
export class AvailableDonationsComponent implements OnInit {

  searchKey:string=''
  searchList:Donation[]=[]
  public settings:Settings;
  donationStatusList=DonationStatus
  constructor(private as:LoginService,public DonationService:DonationsService,private donationTypeService:DonationTypeService,public deliveryTypeService:DeliveryTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.donationTypeService.getDonationTypes()
    this.deliveryTypeService.getdeliveryTypes()
    this.DonationService.getAvailableDonations()
  }

  getAllDonations(){
    return this.DonationService.AvailableDonationList
  }

  getDonationType(id:string){
    const donationType=this.donationTypeService.donationTypesList.find(x=>x.id==id)
    return donationType!=null?donationType.name:'Not Found'
  }



requesting=false
public SendRequest(Donation:Donation){
  this.requesting=true
    this.store.collection('requests',ref=>ref.where('donationId','==',Donation.id).where('companyId','==',this.as.userId)).get().subscribe(async (doc)=>{
      if(doc.docs.length>0){
        this.openSnackBar('Donation request already sent.','ok')
      }
      else{
         var id=this.store.createId()
         this.store.collection('requests').doc(id).set({
          id:id,
          donationId:Donation.id,
          companyId:this.as.userId,
          isOffered:false
         })
         this.openSnackBar('Donation request sent.','ok')
      }
   }, err=>{
    this.requesting=false
    this.openSnackBar('Donation request failed','ok')
   })
   this.requesting=false
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
