import { HamlaService } from './../../hamla/hamla.service';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentsService } from '../agents.service';
import { city } from '../city';
import { country } from '../country';
import { MasterdataService } from '../masterdata.service';
import { region } from '../region';
import { state } from '../state';
import { Hamla } from '../../hamla/hamla';

@Component({
  selector: 'app-agents-dialog',
  templateUrl: './agents-dialog.component.html',
  styleUrls: ['./agents-dialog.component.scss']
})
export class AgentsDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  searchCityIndex:string=''
  searchCityList:city[]=[]
  searchRegionIndex:string=''
  searchRegionList:region[]=[]
  searchStateIndex:string=''
  searchStateList:state[]=[]
  searchCountryIndex:string=''
  searchCountryList:country[]=[]
  searchHamlaIndex:string=''
  searchHamlaList:Hamla[]=[]
  constructor(public dialogRef: MatDialogRef<AgentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    public agentService:AgentsService,
    private masterDataService:MasterdataService,
    private hamlaService:HamlaService,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      contactPerson: ['', Validators.required],
      cityId: ['', Validators.required],
      hamlaId: ['', Validators.required],
      regionId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      licNo: ['', Validators.required],
      mobile: ['', Validators.required],
      nbrPeople: ['', Validators.required],
    });
   this.form.patchValue(this.data.agent);
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
  filterHamlaList(){
    if(this.searchHamlaIndex!==''){
      this.searchHamlaList= this.hamlaService.hamlasList.filter(x=>x.name.toLowerCase().includes(this.searchHamlaIndex.toLocaleLowerCase()))
      return this.searchHamlaList
     }
    return this.hamlaService.hamlasList
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}
