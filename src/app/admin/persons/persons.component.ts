import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QRCodeComponent } from 'angularx-qrcode';
import { AppSettings,Settings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AgentsService } from '../agents/agents.service';
import { MasterdataService } from '../agents/masterdata.service';
import { Customer } from './customer';
import { Gender } from './gender.enum';
import { PersonsDialogComponent } from './persons-dialog/persons-dialog.component';
import { PersonsService } from './persons.service';
import { QrCodeDialogComponent } from './qrcode/qr-code-dialog/qr-code-dialog.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  searchKey:string=''
  searchList:Customer[]=[]
  public settings:Settings;
  genderList=Gender
  constructor(public customerService:PersonsService, private store:AngularFirestore,private agentService:AgentsService,private masterDataService:MasterdataService, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getCities()
    this.masterDataService.getRegions()
    this.masterDataService.getStates()
    this.masterDataService.getCountries()
    this.customerService.getCustomers()
    this.agentService.getAgents()
  }

  getAllCustomers(){
    if(this.searchKey!==''){
      this.searchList= this.customerService.customersList.filter(x=>x.fullName.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.customerService.customersList
  }

  getCity(id:string){
    const city=this.masterDataService.cityList.find(x=>x.id==id)
    return city.name
  }
  getRegion(id:string){
    const region=this.masterDataService.regionList.find(x=>x.id==id)
    return region.name
  }
  getState(id:string){
    const state=this.masterDataService.stateList.find(x=>x.id==id)
    return state.name
  }
  getCountry(id:string){
    const country=this.masterDataService.countryList.find(x=>x.id==id)
    return country.name
  }


  public openQrCodePage(data:any){
    const dialogRef=this.dialog.open(
      QrCodeDialogComponent,
     {
      data:{
        custNo:data
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
     }
    )
  }
  public openCustomerDialog(data:any,isNew:boolean){let name='';

  if(!isNew){
    if(!(data.dob instanceof Date)){
      data.dob=data.dob.toDate()
    }
    name=data.fullName
    if(data.imageUrl==""){
      data.imageUrl="assets/images/user.png"
    }

    //console.log(data.dob)
  }
  const dialogRef = this.dialog.open(PersonsDialogComponent, {
    data: {
      customer:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(customer => {
   if(customer){
     //this.customerService.getCustomers()
     customer.imageUrl=customer.imageUrl=="assets/images/user.png"?"":customer.imageUrl
     const index: number = this.getAllCustomers().findIndex(x => x.id == customer.id);
     console.log(index)
     if(index !== -1){
       this.customerService.updateCustomer(customer)
       this.getAllCustomers()[index] = customer
       this.openSnackBar("Customer information updated successfully","ok")
       return
     }
     else{
       this.getAllCustomers().push(customer)
       this.customerService.addCustomer(customer)
       this.openSnackBar("New customer has been added successfully","ok")
       return
     }
   }

  });
}



public remove(customer:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this customer?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllCustomers().indexOf(customer);
      if (index !== -1) {
        this.customerService.deleteCustomer(customer.id)
        this.getAllCustomers().splice(index, 1)
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
