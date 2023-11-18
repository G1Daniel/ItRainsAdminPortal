import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { country } from '../../agents/country';
import { MasterdataService } from '../../agents/masterdata.service';
import { StatesService } from '../states.service';

@Component({
  selector: 'app-states-dialog',
  templateUrl: './states-dialog.component.html',
  styleUrls: ['./states-dialog.component.scss']
})
export class StatesDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchCountryIndex:string=''
  searchCountryList:country[]=[]
  constructor(public dialogRef: MatDialogRef<StatesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public stateService:StatesService,private masterDataService:MasterdataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      countryId: ['', Validators.required],
    });
   this.form.patchValue(this.data.state);
  }


  filterCountryList(){
    if(this.searchCountryIndex!==''){
      this.searchCountryList= this.masterDataService.countryList.filter(x=>x.name.toLowerCase().includes(this.searchCountryIndex.toLocaleLowerCase()))
      return this.searchCountryList
     }
    return this.masterDataService.countryList
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}

