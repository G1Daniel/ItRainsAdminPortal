import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MasterdataService } from '../agents/masterdata.service';
import { state } from '../agents/state';
import { StatesDialogComponent } from './states-dialog/states-dialog.component';
import { StatesService } from './states.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  searchKey:string=''
  searchList:state[]=[]
  public settings:Settings;
  constructor(public stateService:StatesService,private store:AngularFirestore,private masterDataService:MasterdataService, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getRegions()
    this.masterDataService.getCountries()

    this.stateService.getStates()
  }

  getAllStates(){
    if(this.searchKey!==''){
      this.searchList= this.stateService.statesList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.stateService.statesList
  }

  getCountry(id:string){
    const country=this.masterDataService.countryList.find(x=>x.id==id)
    return country!=null?country.name:'Not Found'
  }

  public openStateDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(StatesDialogComponent, {
    data: {
      state:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(state => {
    if(state){
      //this.agentService.getAgents()
      const index: number = this.getAllStates().findIndex(x => x.id == state.id);
        console.log(index)
        if(index !== -1){
          this.stateService.updateState(state)
          this.getAllStates()[index] = state
          this.openSnackBar("State information updated successfully","ok")
          return
        }
        else{
          this.getAllStates().push(state)
          this.stateService.addState(state)
          this.openSnackBar("New state has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(state:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this state?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllStates().indexOf(state);
      if (index !== -1) {
        this.stateService.deleteState(state.id)
        this.getAllStates().splice(index, 1)
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

