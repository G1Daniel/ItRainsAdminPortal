import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DeliveryType } from './delivery-type';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypesDialogComponent } from './delivery-types-dialog/delivery-types-dialog.component';

@Component({
  selector: 'app-delivery-types',
  templateUrl: './delivery-types.component.html',
  styleUrls: ['./delivery-types.component.scss']
})
export class DeliveryTypesComponent implements OnInit {

  searchKey:string=''
  searchList:DeliveryType[]=[]
  public settings:Settings;
  constructor(public deliveryService:DeliveryTypeService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.deliveryService.getdeliveryTypes()
    console.log(this.deliveryService.deliveryTypesList.length)
  }

  getAllDeliveryList(){
    if(this.searchKey!==''){
      this.searchList= this.deliveryService.deliveryTypesList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.deliveryService.deliveryTypesList
  }



  public openDeliveryDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(DeliveryTypesDialogComponent, {
    data: {
      delivery:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Delivery => {
    if(Delivery){
      const index: number = this.getAllDeliveryList().findIndex(x => x.id == Delivery.id);
        console.log(index)
        if(index !== -1){
          this.deliveryService.updateDeliveryType(Delivery)
          this.getAllDeliveryList()[index] = Delivery
          this.openSnackBar("Delivery type information updated successfudly","ok")
          return
        }
        else{
          this.getAllDeliveryList().push(Delivery)
          this.deliveryService.addDeliveryType(Delivery)
          this.openSnackBar("New Delivery type has been addeddsuccessfully","ok")
          return
        }
    }

  }
  );
}



public remove(delivery:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this Delivery type?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllDeliveryList().indexOf(delivery);
      if (index !== -1) {
        this.deliveryService.deleteDeliveryType(delivery.id)
        this.getAllDeliveryList().splice(index, 1)
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
