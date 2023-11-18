import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterdataService } from '../../agents/masterdata.service';
import { state } from '../../agents/state';
import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-regions-dialog',
  templateUrl: './regions-dialog.component.html',
  styleUrls: ['./regions-dialog.component.scss']
})
export class RegionsDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchStateIndex:string=''
  searchStateList:state[]=[]
  constructor(public dialogRef: MatDialogRef<RegionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public regionService:RegionsService,private masterDataService:MasterdataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      code: ['', Validators.required],
      stateId: ['', Validators.required],
    });
   this.form.patchValue(this.data.region);
  }

  filterStateList(){
    if(this.searchStateIndex!==''){
      this.searchStateList= this.masterDataService.stateList.filter(x=>x.name.toLowerCase().includes(this.searchStateIndex.toLocaleLowerCase()))
      return this.searchStateList
     }
    return this.masterDataService.stateList
  }
  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}
