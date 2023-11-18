import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { country } from '../../agents/country';
import { MasterdataService } from '../../agents/masterdata.service';
import { region } from '../../agents/region';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-cities-dialog',
  templateUrl: './cities-dialog.component.html',
  styleUrls: ['./cities-dialog.component.scss']
})
export class CitiesDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchRegionIndex:string=''
  searchRegionList:region[]=[]
  searchCountryIndex:string=''
  searchCountryList:country[]=[]
  constructor(public dialogRef: MatDialogRef<CitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public cityService:CitiesService,private masterDataService:MasterdataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required],
    });
   this.form.patchValue(this.data.city);
  }



  filterRegionList(){
    if(this.searchRegionIndex!==''){
      this.searchRegionList= this.masterDataService.regionList.filter(x=>x.name.toLowerCase().includes(this.searchRegionIndex.toLocaleLowerCase()))
      return this.searchRegionList
     }
    return this.masterDataService.regionList
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

