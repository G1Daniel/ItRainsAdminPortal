import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Country } from './country';
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  searchKey:string=''
  searchList:Country[]=[]
  public settings:Settings;
  constructor(public countryService:CountryService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.countryService.getCountries()
  }

  getAllCountries(){
    if(this.searchKey!==''){
      this.searchList= this.countryService.countriesList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.countryService.countriesList
  }


  public openCountryDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(CountryDialogComponent, {
    data: {
      country:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(country => {
    if(country){
      const index: number = this.getAllCountries().findIndex(x => x.id == country.id);
        console.log(index)
        if(index !== -1){
          this.countryService.updateCountry(country)
          this.getAllCountries()[index] = country
          this.openSnackBar("Country information updated successfully","ok")
          return
        }
        else{
          this.getAllCountries().push(country)
          this.countryService.addCountry(country)
          this.openSnackBar("New country has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(country:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this country?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllCountries().indexOf(country);
      if (index !== -1) {
        this.countryService.deleteCountry(country.id)
        this.getAllCountries().splice(index, 1)
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
