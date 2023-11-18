import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings, Settings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DonationType } from './donation-type';
import { DonationTypeService } from './donation-type.service';
import { DonationTypesDialogComponent } from './donation-types-dialog/donation-types-dialog.component';

@Component({
  selector: 'app-donation-types',
  templateUrl: './donation-types.component.html',
  styleUrls: ['./donation-types.component.scss']
})
export class DonationTypesComponent implements OnInit {

  searchKey:string=''
  searchList:DonationType[]=[]
  public settings:Settings;
  constructor(public DonationService:DonationTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.DonationService.getDonationTypes()
    console.log(this.DonationService.donationTypesList.length)
  }

  getAllDonationList(){
    if(this.searchKey!==''){
      this.searchList= this.DonationService.donationTypesList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.DonationService.donationTypesList
  }



  public openDonationDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(DonationTypesDialogComponent, {
    data: {
      donation:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Donation => {
    if(Donation){
      const index: number = this.getAllDonationList().findIndex(x => x.id == Donation.id);
        console.log(index)
        if(index !== -1){
          this.DonationService.updateDonationType(Donation)
          this.getAllDonationList()[index] = Donation
          this.openSnackBar("Donation type information updated successfudly","ok")
          return
        }
        else{
          this.getAllDonationList().push(Donation)
          this.DonationService.addDonationType(Donation)
          this.openSnackBar("New Donation type has been addeddsuccessfully","ok")
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
      message: "Are you sure you want remove this Donation type?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllDonationList().indexOf(Donation);
      if (index !== -1) {
        this.DonationService.deleteDonationType(Donation.id)
        this.getAllDonationList().splice(index, 1)
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

