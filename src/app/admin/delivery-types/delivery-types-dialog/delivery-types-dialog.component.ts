import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryTypeService } from '../delivery-type.service';

@Component({
  selector: 'app-delivery-types-dialog',
  templateUrl: './delivery-types-dialog.component.html',
  styleUrls: ['./delivery-types-dialog.component.scss']
})
export class DeliveryTypesDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<DeliveryTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public deliveryService:DeliveryTypeService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
   this.form.patchValue(this.data.delivery);
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}


