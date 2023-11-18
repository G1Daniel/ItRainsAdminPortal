import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { accommodation } from 'src/app/admin/accommodation/accommodation';
import { AccommodationService } from 'src/app/admin/accommodation/accommodation.service';
import { Customer } from 'src/app/admin/persons/customer';
import { PersonsService } from 'src/app/admin/persons/persons.service';
import { ActiveStatus } from '../../active-status.enum';

@Component({
  selector: 'app-accommodation-customer-dialog',
  templateUrl: './accommodation-customer-dialog.component.html',
  styleUrls: ['./accommodation-customer-dialog.component.scss']
})
export class AccommodationCustomerDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchAccommodationIndex:string=''
  searchAccommodationList:accommodation[]=[]
  searchCustomerIndex:string=''
  searchCustomerList:Customer[]=[]
  statuses:number[]
  statusList=ActiveStatus
  constructor(public dialogRef: MatDialogRef<AccommodationCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public accommodationService:AccommodationService,private customerService:PersonsService) { }

  ngOnInit(): void {
    this.statuses= Object.keys(this.statusList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)))
    this.form = this.fb.group({
      id: 0,
      accoId: ['', Validators.required],
      custId: ['', Validators.required],
      roomUnit: ['', Validators.required],
      isActive: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });


    this.form.patchValue(this.data.accommodationCustomer);
  }



  filterAccommodationsList(){
    if(this.searchAccommodationIndex!==''){
      this.searchAccommodationList= this.accommodationService.accomodationsList.filter(x=>x.name.toLowerCase().includes(this.searchAccommodationIndex.toLocaleLowerCase()))
      return this.searchAccommodationList
     }
    return this.accommodationService.accomodationsList
  }
  filterCustomersList(){
    if(this.searchCustomerIndex!==''){
      this.searchCustomerList= this.customerService.customersList.filter(x=>x.fullName.toLowerCase().includes(this.searchCustomerIndex.toLocaleLowerCase()))
      return this.searchCustomerList
     }
    return this.customerService.customersList
  }


  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
