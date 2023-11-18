import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { city } from 'src/app/admin/agents/city';
import { country } from 'src/app/admin/agents/country';
import { MasterdataService } from 'src/app/admin/agents/masterdata.service';
import { region } from 'src/app/admin/agents/region';
import { state } from 'src/app/admin/agents/state';
import { Gender } from 'src/app/admin/persons/gender.enum';
import { AccommodationService } from '../../accommodation.service';

@Component({
  selector: 'app-accommodation-dialog',
  templateUrl: './accommodation-dialog.component.html',
  styleUrls: ['./accommodation-dialog.component.scss']
})
export class AccommodationDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchCityIndex:string=''
  searchCityList:city[]=[]
  searchRegionIndex:string=''
  searchRegionList:region[]=[]
  searchStateIndex:string=''
  searchStateList:state[]=[]
  searchCountryIndex:string=''
  searchCountryList:country[]=[]
  genders:number[]
  genderList=Gender
  constructor(public dialogRef: MatDialogRef<AccommodationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public accommodationService:AccommodationService,private masterDataService:MasterdataService) { }

  ngOnInit(): void {
    this.genders= Object.keys(this.genderList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)))

    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      cityId: ['', Validators.required],
      district: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      contactPerson: ['', Validators.required],
    });

    this.form.patchValue(this.data.accommodation);
  }



  filterCityList(){
    if(this.searchCityIndex!==''){
      this.searchCityList= this.masterDataService.cityList.filter(x=>x.name.toLowerCase().includes(this.searchCityIndex.toLocaleLowerCase()))
      return this.searchCityList
     }
    return this.masterDataService.cityList
  }
  filterRegionList(){
    if(this.searchRegionIndex!==''){
      this.searchRegionList= this.masterDataService.regionList.filter(x=>x.name.toLowerCase().includes(this.searchRegionIndex.toLocaleLowerCase()))
      return this.searchRegionList
     }
    return this.masterDataService.regionList
  }
  filterStateList(){
    if(this.searchStateIndex!==''){
      this.searchStateList= this.masterDataService.stateList.filter(x=>x.name.toLowerCase().includes(this.searchStateIndex.toLocaleLowerCase()))
      return this.searchStateList
     }
    return this.masterDataService.stateList
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

