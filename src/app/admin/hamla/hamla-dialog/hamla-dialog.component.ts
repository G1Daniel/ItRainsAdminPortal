import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HamlaService } from '../hamla.service';

@Component({
  selector: 'app-hamla-dialog',
  templateUrl: './hamla-dialog.component.html',
  styleUrls: ['./hamla-dialog.component.scss']
})
export class HamlaDialogComponent implements OnInit {


  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<HamlaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public hamlaService:HamlaService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      contactPerson: ['', Validators.required],
      address: ['', Validators.required],
    });
   this.form.patchValue(this.data.hamla);
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}

