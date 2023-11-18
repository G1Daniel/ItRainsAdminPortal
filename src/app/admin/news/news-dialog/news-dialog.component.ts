import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from '../news.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage'

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
    public fb: UntypedFormBuilder,public newsService:NewsService) { }

  ngOnInit(): void {
    //console.log(this.selectedFiles);
    this.form = this.fb.group({
      id: 0,
      imageUrl:['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    if(!this.data.isNew){
      this.url1=this.data.news.imageUrl
    }
   this.form.patchValue(this.data.news);
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
      //this.form.value.imageUrl=""
      if(this.url1!=this.url){
        if(!this.data.isNew){
          if(this.url1==this.data.news.imageUrl){
            this.newsService.loading=false
            this.dialogRef.close(this.form.value);
            return;
          }
        }
        console.log('Working')
        const file = this.selectedFiles;
        this.newsService.loading=true

        // Get the fullPath in Storage after upload
        const fullPathInStorage = await this.uploadImage(this.form.value.title, file);

        console.log(fullPathInStorage)
        // Get the downloadUrl for the src of img
        this.form.value.imageUrl = await this.storage
            .ref(fullPathInStorage)
            .getDownloadURL()
            .toPromise();
            this.newsService.loading=false
            this.dialogRef.close(this.form.value);
      }
      else{
        console.log('Working outside')
        this.newsService.loading=false
        this.dialogRef.close(this.form.value);
      }
    }
  }


}


