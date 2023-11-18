import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonationTypeService } from '../donation-type.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-donation-types-dialog',
  templateUrl: './donation-types-dialog.component.html',
  styleUrls: ['./donation-types-dialog.component.scss']
})
export class DonationTypesDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<DonationTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage:AngularFireStorage,
    public fb: UntypedFormBuilder,public DonationService:DonationTypeService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl:['', Validators.required]
    });
    if(!this.data.isNew){
      this.url1=this.data.donation.imageUrl
    }
   this.form.patchValue(this.data.donation);
  }

  selectedFiles: File[];
  public url:string="assets/upload.jpg"
  url1='assets/upload.jpg'
  onImageSelected(event:any){
    if(event.target.files){
      this.selectedFiles=event.target.files[0]
      var reader=new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event:any)=>{
        //this.form.value.imageUrl=event.target.result
        this.url1=event.target.result
        //this.form.controls.imageUrl.setValue(event.target.result);

      }
    }
  }
  async uploadImage(uid, file): Promise<string> {
    const fileRef = this.storage.ref(uid).child(file.name);
    console.log(file)
    // Upload file in reference
    if (file) {
      const result = await fileRef.put(file);
      console.log(result)
      return result.ref.fullPath;
    }
  }
  public async onSubmit(){
    if(this.form.valid){
      if(this.url1!=this.url){
        if(!this.data.isNew){
          if(this.url1==this.data.donation.imageUrl){
            this.DonationService.loading=false
            this.dialogRef.close(this.form.value);
            return;
          }
        }
        console.log('Working')
        const file = this.selectedFiles;
        this.DonationService.loading=true

        // Get the fullPath in Storage after upload
        const fullPathInStorage = await this.uploadImage(this.form.value.name, file);

        console.log(fullPathInStorage)
        // Get the downloadUrl for the src of img
        this.form.value.imageUrl = await this.storage
            .ref(fullPathInStorage)
            .getDownloadURL()
            .toPromise();
            this.DonationService.loading=false
            this.dialogRef.close(this.form.value);
      }
      else{
        console.log('Working outside')
        this.DonationService.loading=false
        this.dialogRef.close(this.form.value);
      }
    }
  }


}

