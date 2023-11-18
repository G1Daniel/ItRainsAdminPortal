import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { accommodation } from './accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  accomodationsList:accommodation[]=[]
  loading:boolean=false

  constructor(private store:AngularFirestore) { }

  getAccomodations(){
    this.loading=true
    this.store.collection('accommodations').snapshotChanges().subscribe(res =>{
      this.accomodationsList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      this.loading=false
      return data
     })
   }, err=>{
   })
  }
  addAccommodation(accommodation:accommodation){
    this.loading=true;
    accommodation.id=this.store.createId()
    this.store.collection('accommodations').doc(accommodation.id).set(accommodation).then((data)=>{
      this.loading=false
    })
  }
  updateAccommodation(accommodation:accommodation){
    this.loading=true
    this.store.collection('accommodations').doc(accommodation.id).update(accommodation).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteAccommodation(id:string){
    this.loading=true
    this.store.collection('accommodations').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }

}
