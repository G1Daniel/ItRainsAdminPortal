import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { city } from '../agents/city';
import { MasterdataService } from '../agents/masterdata.service';
import { CitiesDialogComponent } from './cities-dialog/cities-dialog.component';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  searchKey:string=''
  searchList:city[]=[]
  public settings:Settings;
  constructor(public cityService:CitiesService,private store:AngularFirestore,private masterDataService:MasterdataService, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getRegions()
    this.masterDataService.getCountries()

    this.cityService.getCities()
  }

  getAllCities(){
    if(this.searchKey!==''){
      this.searchList= this.cityService.citiesList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.cityService.citiesList
  }

  getRegion(id:string){
    const region=this.masterDataService.regionList.find(x=>x.id==id)
    return region!=null?region.name:'Not Found'
  }
  getCountry(id:string){
    const country=this.masterDataService.countryList.find(x=>x.id==id)
    return country!=null?country.name:'Not Found'
  }

  public openCityDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(CitiesDialogComponent, {
    data: {
      city:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(city => {
    if(city){
      //this.agentService.getAgents()
      const index: number = this.getAllCities().findIndex(x => x.id == city.id);
        console.log(index)
        if(index !== -1){
          this.cityService.updateCity(city)
          this.getAllCities()[index] = city
          this.openSnackBar("City information updated successfully","ok")
          return
        }
        else{
          this.getAllCities().push(city)
          this.cityService.addCity(city)
          this.openSnackBar("New city has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(city:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this city?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllCities().indexOf(city);
      if (index !== -1) {
        this.cityService.deleteCity(city.id)
        this.getAllCities().splice(index, 1)
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

