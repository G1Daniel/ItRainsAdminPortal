import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MasterdataService } from '../agents/masterdata.service';
import { region } from '../agents/region';
import { RegionsDialogComponent } from './regions-dialog/regions-dialog.component';
import { RegionsService } from './regions.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {

  searchKey:string=''
  searchList:region[]=[]
  public settings:Settings;
  constructor(public regionService:RegionsService,private masterDataService:MasterdataService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getStates()
    this.regionService.getRegions()
  }

  getAllRegions(){
    if(this.searchKey!==''){
      this.searchList= this.regionService.regionsList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.regionService.regionsList
  }


  getState(id:string){
    const state=this.masterDataService.stateList.find(x=>x.id==id)
    return state!=null?state.name:'Not Found'
  }

  public openRegionDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(RegionsDialogComponent, {
    data: {
      region:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(region => {
    if(region){
      const index: number = this.getAllRegions().findIndex(x => x.id == region.id);
        console.log(index)
        if(index !== -1){
          this.regionService.updateRegion(region)
          this.getAllRegions()[index] = region
          this.openSnackBar("Region information updated successfully","ok")
          return
        }
        else{
          this.getAllRegions().push(region)
          this.regionService.addRegion(region)
          this.openSnackBar("New region has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(region:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this region?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllRegions().indexOf(region);
      if (index !== -1) {
        this.regionService.deleteRegion(region.id)
        this.getAllRegions().splice(index, 1)
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


