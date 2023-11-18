import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DonationType } from './donation-type';

@Injectable({
  providedIn: 'root'
})
export class DonationTypeService {

  donationTypesList:DonationType[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getDonationTypes(){
    this.loading=true
    this.store.collection('donationTypes').snapshotChanges().subscribe(res =>{
      this.donationTypesList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addDonationType(donationType:DonationType){
    this.loading=true;
    donationType.id=this.store.createId()
    this.store.collection('donationTypes').doc(donationType.id).set(donationType).then((data)=>{
      this.loading=false
    })
  }
  updateDonationType(donationType:DonationType){
    this.loading=true
    this.store.collection('donationTypes').doc(donationType.id).update(donationType).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteDonationType(id:string){
    this.loading=true
    this.store.collection('donationTypes').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
