import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Company } from './company';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  searchKey:string=''
  searchList:Company[]=[]
  public settings:Settings;
  constructor(public CompanyService:CompanyService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.CompanyService.getCompanies()
    console.log(this.CompanyService.CompanyList.length)
  }

  getAllCompanyList(){
    if(this.searchKey!==''){
      this.searchList= this.CompanyService.CompanyList.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.CompanyService.CompanyList
  }



  public openCompanyDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(CompanyDialogComponent, {
    data: {
      Company:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Company => {
    if(Company){
      const index: number = this.getAllCompanyList().findIndex(x => x.id == Company.id);
        console.log(index)
        if(index !== -1){
          this.CompanyService.updateCompany(Company)
          this.getAllCompanyList()[index] = Company
          this.openSnackBar("Company information updated successfudly","ok")
          return
        }
        else{
          this.getAllCompanyList().push(Company)
          this.CompanyService.addCompany(Company)
          this.openSnackBar("New Company has been addeddsuccessfully","ok")
          return
        }
    }

  }
  );
}



public remove(Company:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this Company?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllCompanyList().indexOf(Company);
      if (index !== -1) {
        this.CompanyService.deleteCompany(Company.id)
        this.getAllCompanyList().splice(index, 1)
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

