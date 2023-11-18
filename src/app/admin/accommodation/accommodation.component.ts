import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MasterdataService } from '../agents/masterdata.service';
import { accommodation } from './accommodation';
import { AccommodationDialogComponent } from './accommodation-dialog/accommodation-dialog/accommodation-dialog.component';
import { AccommodationService } from './accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  searchKey:string=''
  searchList:accommodation[]=[]
  public settings:Settings;
  constructor(public accommodationService:AccommodationService,private store:AngularFirestore,private masterDataService:MasterdataService, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getCities()
    this.masterDataService.getRegions()
    this.masterDataService.getStates()
    this.masterDataService.getCountries()

    this.accommodationService.getAccomodations()
  }

  getAllAccomdations(){
    if(this.searchKey!==''){
      this.searchList= this.accommodationService.accomodationsList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.accommodationService.accomodationsList
  }

  getCity(id:string){
    const city=this.masterDataService.cityList.find(x=>x.id==id)
    return city!=null?city.name:'Not Found'
  }
  getRegion(id:string){
    const region=this.masterDataService.regionList.find(x=>x.id==id)
    return region!=null?region.name:'Not Found'
  }
  getState(id:string){
    const state=this.masterDataService.stateList.find(x=>x.id==id)
    return state!=null?state.name:'Not Found'
  }
  getCountry(id:string){
    const country=this.masterDataService.countryList.find(x=>x.id==id)
    return country!=null?country.name:'Not Found'
  }

  public openAccommodationDialog(data:any,isNew:boolean){let name='';
  if(!isNew){
    name=data.name
  }
  const dialogRef = this.dialog.open(AccommodationDialogComponent, {
    data: {
      accommodation:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(accommodation => {
    if(accommodation){
        const index: number = this.getAllAccomdations().findIndex(x => x.id == accommodation.id);
        console.log(index)
        if(index !== -1){
          this.accommodationService.updateAccommodation(accommodation)
          this.getAllAccomdations()[index] = accommodation
          this.openSnackBar("Accommodation information updated successfully","ok")
          return
        }
        else{
          this.getAllAccomdations().push(accommodation)
          this.accommodationService.addAccommodation(accommodation)
          this.openSnackBar("New accomodation has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(accommodation:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this accommodation?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllAccomdations().indexOf(accommodation);
      if (index !== -1) {
        this.accommodationService.deleteAccommodation(accommodation.id)
        this.getAllAccomdations().splice(index, 1)
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
