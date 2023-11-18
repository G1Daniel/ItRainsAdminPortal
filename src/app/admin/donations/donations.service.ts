import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Donation } from './donation';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  DonationList:Donation[]=[]
  AvailableDonationList:Donation[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getDonations(){
    this.loading=true
    this.store.collection('donations').snapshotChanges().subscribe(res =>{
      this.DonationList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  getAvailableDonations(){
    this.loading=true
    this.store.collection('donations',ref=>ref.where('status','==',1).where('isAvailable','==',true)).snapshotChanges().subscribe(res =>{
      this.AvailableDonationList=res.map((d:any)=>{
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
  addDonation(Donation:Donation){
    this.loading=true;
    Donation.id=this.store.createId()
    this.store.collection('donations').doc(Donation.id).set(Donation).then((data)=>{
      this.loading=false
    })
  }
  updateDonation(Donation:Donation){
    this.loading=true
    this.store.collection('donations').doc(Donation.id).update(Donation).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteDonation(id:string){
    this.loading=true
    this.store.collection('donations').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
