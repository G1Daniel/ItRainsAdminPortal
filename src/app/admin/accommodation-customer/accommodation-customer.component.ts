import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AccommodationService } from '../accommodation/accommodation.service';
import { MasterdataService } from '../agents/masterdata.service';
import { PersonsService } from '../persons/persons.service';
import { accommodationCustomer } from './accommodation-customer';
import { AccommodationCustomerService } from './accommodation-customer.service';
import { AccommodationCustomerDialogComponent } from './accommodationCustomer-dialog/accommodation-customer-dialog/accommodation-customer-dialog.component';
import { ActiveStatus } from './active-status.enum';

@Component({
  selector: 'app-accommodation-customer',
  templateUrl: './accommodation-customer.component.html',
  styleUrls: ['./accommodation-customer.component.scss']
})
export class AccommodationCustomerComponent implements OnInit {

  searchKey:string=''
  searchList:accommodationCustomer[]=[]
  public settings:Settings;
  statusList=ActiveStatus
  constructor(public accommodationCustomerService:AccommodationCustomerService,private store:AngularFirestore,private accommodationService:AccommodationService,private customerService:PersonsService, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
     this.accommodationService.getAccomodations()
     this.customerService.getCustomers()
    this.accommodationCustomerService.getAccomodationCustomers()
  }

  getAllAccommodationCustomers(){
     return this.accommodationCustomerService.accomodationCustomersList
  }

  getAccommodation(id:string){
    const accommodation=this.accommodationService.accomodationsList.find(x=>x.id==id)
    return accommodation!=null?accommodation.name:'Not Found'
  }
  getCustomer(id:string){
    const customer=this.customerService.customersList.find(x=>x.id==id)
    return customer!=null?customer.fullName:'Not Found'
  }

  public openAccommodationCustomerDialog(data:any,isNew:boolean){let name='';
  if(!isNew){
    data.checkInDate=data.checkInDate.toDate()
    data.checkOutDate=data.checkOutDate.toDate()
  }
  const dialogRef = this.dialog.open(AccommodationCustomerDialogComponent, {
    data: {
      accommodationCustomer:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(accommodationCustomer => {
    if(accommodationCustomer){
        const index: number = this.getAllAccommodationCustomers().findIndex(x => x.id == accommodationCustomer.id);
        console.log(index)
        if(index !== -1){
          this.accommodationCustomerService.updateAccommodationCustomer(accommodationCustomer)
          this.getAllAccommodationCustomers()[index] = accommodationCustomer
          this.openSnackBar("Accommodation customer information updated successfully","ok")
          return
        }
        else{
          this.getAllAccommodationCustomers().push(accommodationCustomer)
          this.accommodationCustomerService.addAccommodationCustomer(accommodationCustomer)
          this.openSnackBar("New accomodation customer has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(accommodationCustomer:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this accommodation customer?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllAccommodationCustomers().indexOf(accommodationCustomer);
      if (index !== -1) {
        this.accommodationCustomerService.deleteAccommodationCustomer(accommodationCustomer.id)
        this.getAllAccommodationCustomers().splice(index, 1)
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

