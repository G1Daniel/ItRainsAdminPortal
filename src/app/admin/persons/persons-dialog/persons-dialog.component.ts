import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AgentsDialogComponent } from '../../agents/agents-dialog/agents-dialog.component';
import { AgentsService } from '../../agents/agents.service';
import { city } from '../../agents/city';
import { country } from '../../agents/country';
import { MasterdataService } from '../../agents/masterdata.service';
import { region } from '../../agents/region';
import { state } from '../../agents/state';
import { Gender } from '../gender.enum';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-persons-dialog',
  templateUrl: './persons-dialog.component.html',
  styleUrls: ['./persons-dialog.component.scss']
})
export class PersonsDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  searchCityIndex:string=''
  searchCityList:city[]=[]
  searchRegionIndex:string=''
  searchRegionList:region[]=[]
  searchStateIndex:string=''
  searchStateList:state[]=[]
  searchCountryIndex:string=''
  searchCountryList:country[]=[]
  genders:number[]
  formData = new FormData();
  genderList=Gender
  constructor(public dialogRef: MatDialogRef<AgentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    private storage:AngularFireStorage,
    public agentService:AgentsService,public customerService:PersonsService,private masterDataService:MasterdataService,private firestore:AngularFirestore,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.genders= Object.keys(this.genderList).map(key => parseInt(key)).filter(f => !isNaN(Number(f)))

    this.form = this.fb.group({
      id: 0,

      imageUrl:'assets/images/user.png',
      fullName: ['', Validators.required],
      custNo:['',Validators.required],
      motherName: ['', Validators.required],
      passNo: ['', Validators.required],
      nationality: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      nextKin: ['', Validators.required],
      mobile: ['', Validators.required],
      nkMobile: ['', Validators.required],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      stateId: ['', Validators.required],
      agentId: ['', Validators.required],
    });

    // if(!this.data.isNew){
    //   this.form.value.dob=this.data.customer.dob.toDate()
    // }
    this.form.patchValue(this.data.customer);
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


   async checkIfCustumerNoExist() : Promise<boolean> {
    var customerQuery=await this.firestore.collection('customers',ref=>ref.where('custNo','==',this.form.value.custNo)).snapshotChanges()
    .pipe(map(docs => docs.length > 0)).toPromise()
    console.log(customerQuery)
    return customerQuery
    return
    this.firestore.collection('customers',ref=>ref.where('custNo','==',this.form.value.custNo)).snapshotChanges().subscribe(data=>{
      if(data.length>0){
        return true
      }
      else{
        return false
      }
    })
  }

  selectedFiles: File[];
  public url:string="assets/images/user.png"
  onImageSelected(event:any){
    if(event.target.files){
      this.selectedFiles=event.target.files[0]
      var reader=new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event:any)=>{
        this.form.value.imageUrl=event.target.result
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
    console.log()
    if(this.form.valid){
      
      //this.form.value.imageUrl=""
      if(this.form.value.imageUrl!=this.url && this.form.value.imageUrl!=this.data.customer.imageUrl){
        const file = this.selectedFiles;

        // Get the fullPath in Storage after upload
        const fullPathInStorage = await this.uploadImage(this.form.value.fullName, file);

        console.log(fullPathInStorage)
        // Get the downloadUrl for the src of img
        this.form.value.imageUrl = await this.storage
            .ref(fullPathInStorage)
            .getDownloadURL()
            .toPromise();
      }
      var valid=this.data.isNew?this.data.isNew:this.data.customer.custNo!=this.form.value.custNo
      if(valid){
        this.firestore.collection('customers',ref=>ref.where('custNo','==',this.form.value.custNo)).snapshotChanges().pipe(take(1)).subscribe(res=>{
          if(res.length>0){
            this.openSnackBar("Customer number already exists","ok")
            return
          }
          else{
            this.dialogRef.close(this.form.value);
          }
        })
      }
      else{
        this.dialogRef.close(this.form.value);
      }
    }
  }
  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
  }
}


