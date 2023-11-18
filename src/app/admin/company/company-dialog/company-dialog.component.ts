import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
    public fb: UntypedFormBuilder,public CompanyService:CompanyService) { }

  ngOnInit(): void {
    //console.log(this.selectedFiles);
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      role:'charity'
    });

    this.form.patchValue(this.data.Company);
  }

  public async onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}
