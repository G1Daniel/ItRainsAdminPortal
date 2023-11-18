import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../company/company.service';
import { DonationsService } from '../../donations/donations.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent implements OnInit {

  loading=false
  public form: UntypedFormGroup;
  constructor(private companyService:CompanyService,private store:AngularFirestore,private DonationService:DonationsService,public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: ['', Validators.required],
    });
  }

  getCompany(id:string){
    const company=this.companyService.CompanyList.find(x=>x.id==id)
    return company!=null?company.name:'Not Found'
  }
  getDonationQuantity(id:string){
    const donation=this.DonationService.DonationList.find(x=>x.id==id)
    return donation!=null?donation.quantity:0
  }
  public onSubmit(){
    if(this.form.valid){
      if(this.form.value.quantity>this.getDonationQuantity(this.data.Request.donationId)){
        this.openSnackBar('Insufficient available quantity','ok')
        return
      }
       var remainingQuantity=this.getDonationQuantity(this.data.Request.donationId)-this.form.value.quantity
      this.store.collection('donations').doc(this.data.Request.donationId).update({
        quantity:remainingQuantity
      })
      this.store.collection('requests').doc(this.data.Request.id).update({
        isOffered:true
      })
      var obtainedId=this.store.createId()
      this.store.collection('obtainedDonations').doc(obtainedId).set({
        id:obtainedId,
        companyId:this.data.Request.companyId,
        allowedQuantity:this.form.value.quantity,
        donationId:this.data.Request.donationId
      })
      this.dialogRef.close(this.data.Request);
    }
  }
  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
   }
}
