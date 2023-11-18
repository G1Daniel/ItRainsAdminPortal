import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DeliveryTypeService } from '../delivery-types/delivery-type.service';
import { DonationTypeService } from '../donation-types/donation-type.service';
import { Donation } from './donation';
import { DonationStatus } from './donation-status.enum';
import { DonationsDialogComponent } from './donations-dialog/donations-dialog.component';
import { DonationsService } from './donations.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {

  searchKey:string=''
  searchList:Donation[]=[]
  public settings:Settings;
  donationStatusList=DonationStatus
  constructor(public DonationService:DonationsService,private donationTypeService:DonationTypeService,public deliveryTypeService:DeliveryTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit(): void {
    this.donationTypeService.getDonationTypes()
    this.deliveryTypeService.getdeliveryTypes()
    this.DonationService.getDonations()
  }

  getAllDonations(){
    if(this.searchKey!==''){
      this.searchList= this.DonationService.DonationList.filter(x=>this.getDonationType(x.donationTypeId).toLowerCase().includes(this.searchKey.toLowerCase()))
      return this.searchList
     }
    return this.DonationService.DonationList
  }

  getDonationType(id:string){
    const donationType=this.donationTypeService.donationTypesList.find(x=>x.id==id)
    return donationType!=null?donationType.name:'Not Found'
  }

  public openDonationDialog(data:any,isNew:boolean){let name='';
  const dialogRef = this.dialog.open(DonationsDialogComponent, {
    data: {
      Donation:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Donation => {
    if(Donation){
      const index: number = this.getAllDonations().findIndex(x => x.id == Donation.id);
        console.log(index)
        if(index !== -1){
          this.DonationService.updateDonation(Donation)
          this.getAllDonations()[index] = Donation
          this.openSnackBar("Donation information updated successfully","ok")
          return
        }
        else{
          this.getAllDonations().push(Donation)
          this.DonationService.addDonation(Donation)
          this.openSnackBar("New Donation has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(Donation:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this Donation?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllDonations().indexOf(Donation);
      if (index !== -1) {
        this.DonationService.deleteDonation(Donation.id)
        this.getAllDonations().splice(index, 1)
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
