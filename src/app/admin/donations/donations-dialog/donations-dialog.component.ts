import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryTypeService } from '../../delivery-types/delivery-type.service';
import { DonationTypeService } from '../../donation-types/donation-type.service';
import { Gender } from '../../persons/gender.enum';
import { DonationStatus } from '../donation-status.enum';
import { DonationsService } from '../donations.service';

@Component({
  selector: 'app-donations-dialog',
  templateUrl: './donations-dialog.component.html',
  styleUrls: ['./donations-dialog.component.scss']
})
export class DonationsDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  donationStatuses:number[]
  donationStatusList=DonationStatus
  availableList=[true,false]
  constructor(public dialogRef: MatDialogRef<DonationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    public deliveryTypeService:DeliveryTypeService,public donationTypeService:DonationTypeService,public donationService:DonationsService,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.donationStatuses= Object.keys(this.donationStatusList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)))

    this.form = this.fb.group({
      id: 0,
      donationTypeId:['', Validators.required],
      description: ['', Validators.required],
      isInKg:[{value: '', disabled: true},Validators.required],
      quantity: [{value: '', disabled: true}, Validators.required],
      condition: [{value: '', disabled: true}, Validators.required],
      deliveryTypeId: [{value: '', disabled: true}, Validators.required],
      availableDate: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      remark: [{value: '', disabled: true}, Validators.required],
      status: ['', Validators.required],
      isAvailable: ['', Validators.required],
      postedOn: [{value: '', disabled: true}, Validators.required],
      userId: ['', Validators.required],
      donationNo: ['', Validators.required],
    });

     this.form.patchValue(this.data.Donation);
     this.form.patchValue({
      postedOn:this.data.Donation.postedOn.toDate(),
      availableDate:this.data.Donation.availableDate.toDate()
     });
  }

  getDonationTypes(){
    return this.donationTypeService.donationTypesList
  }
  getDeliveryTypes(){
    return this.deliveryTypeService.deliveryTypesList
  }
  public async onSubmit(){
    console.log()
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
