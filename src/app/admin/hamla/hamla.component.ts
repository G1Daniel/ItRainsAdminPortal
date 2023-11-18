import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Hamla } from './hamla';
import { HamlaDialogComponent } from './hamla-dialog/hamla-dialog.component';
import { HamlaService } from './hamla.service';

@Component({
  selector: 'app-hamla',
  templateUrl: './hamla.component.html',
  styleUrls: ['./hamla.component.scss']
})
export class HamlaComponent implements OnInit {

  searchKey:string=''
  searchList:Hamla[]=[]
  public settings:Settings;
  constructor(public hamlaService:HamlaService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.hamlaService.getHamlas()
  }

  getAllHamlas(){
    if(this.searchKey!==''){
      this.searchList= this.hamlaService.hamlasList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.hamlaService.hamlasList
  }


  public openHamlaDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(HamlaDialogComponent, {
    data: {
      hamla:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(hamla => {
    if(hamla){
      const index: number = this.getAllHamlas().findIndex(x => x.id == hamla.id);
        console.log(index)
        if(index !== -1){
          this.hamlaService.updateHamla(hamla)
          this.getAllHamlas()[index] = hamla
          this.openSnackBar("Hamla information updated successfully","ok")
          return
        }
        else{
          this.getAllHamlas().push(hamla)
          this.hamlaService.addHamla(hamla)
          this.openSnackBar("New hamla has been added successfully","ok")
          return
        }
    }

  }
  );
}



public remove(hamla:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this hamla?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllHamlas().indexOf(hamla);
      if (index !== -1) {
        this.hamlaService.deleteHamla(hamla.id)
        this.getAllHamlas().splice(index, 1)
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
