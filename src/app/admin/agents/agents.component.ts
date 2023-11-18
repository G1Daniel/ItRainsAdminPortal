import { HamlaService } from './../hamla/hamla.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings, Settings  } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Agent} from './agent';
import { AgentsDialogComponent } from './agents-dialog/agents-dialog.component';
import { AgentsService } from './agents.service';
import { MasterdataService } from './masterdata.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {

  searchKey:string=''
  searchList:Agent[]=[]
  public settings:Settings;
  constructor(public agentService:AgentsService,private store:AngularFirestore,
    private masterDataService:MasterdataService,
    private hamlaService:HamlaService,
     public appSettings:AppSettings,
     public dialog: MatDialog,
     private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.masterDataService.getCities()
    this.masterDataService.getRegions()
    this.masterDataService.getStates()
    this.masterDataService.getCountries()
      this.hamlaService.getHamlas()

    this.agentService.getAgents()
  }

  getAllAgents(){
    if(this.searchKey!==''){
      this.searchList= this.agentService.agentsList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.agentService.agentsList
  }

  getHamla(id:string){
    const hamla=this.hamlaService.hamlasList.find(x=>x.id==id)
    return hamla!=null?hamla.name:'Not Found'
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

  public openAgentDialog(data:any,isNew:boolean){let name='';
  if(!isNew){
    name=data.agentName
  }
  const dialogRef = this.dialog.open(AgentsDialogComponent, {
    data: {
      agent:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(agent => {
    if(agent){
      //this.agentService.getAgents()
    const index: number = this.getAllAgents().findIndex(x => x.id == agent.id);
        console.log(index)
        if(index !== -1){
          this.agentService.updateAgent(agent)
          this.getAllAgents()[index] = agent
          this.openSnackBar("Agent information updated successfully","ok")
          return
        }
        else{
          this.getAllAgents().push(agent)
          this.agentService.addAgent(agent)
          this.openSnackBar("New agent has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(agent:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this agent?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllAgents().indexOf(agent);
      if (index !== -1) {
        this.agentService.deleteAgent(agent.id)
        this.getAllAgents().splice(index, 1)
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
