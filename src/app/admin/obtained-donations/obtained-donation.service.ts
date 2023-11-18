import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/login/login.service';
import { ObtainedDonation } from './obtained-donation';

@Injectable({
  providedIn: 'root'
})
export class ObtainedDonationService {

  ObtainedDonationList:ObtainedDonation[]=[]
  AllObtainedDonationList:ObtainedDonation[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore,private as:LoginService) { }

  getObtainedDonations(){
    this.loading=true
    this.store.collection('obtainedDonations',ref=>ref.where('companyId','==',this.as.userId)).snapshotChanges().subscribe(res =>{
      this.ObtainedDonationList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      console.log(data)
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  getAllObtainedDonations(){
    this.loading=true
    this.store.collection('obtainedDonations').snapshotChanges().subscribe(res =>{
      this.AllObtainedDonationList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      console.log(data)
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
}

