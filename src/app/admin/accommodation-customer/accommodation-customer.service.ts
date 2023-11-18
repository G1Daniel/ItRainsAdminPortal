import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { accommodationCustomer } from './accommodation-customer';

@Injectable({
  providedIn: 'root'
})
export class AccommodationCustomerService {

  accomodationCustomersList:accommodationCustomer[]=[]
  loading:boolean=false

  constructor(private store:AngularFirestore) { }

  getAccomodationCustomers(){
    this.loading=true
    this.store.collection('accommodationCustomers').snapshotChanges().subscribe(res =>{
      this.accomodationCustomersList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      this.loading=false
      return data
     })
   }, err=>{
   })
  }
  addAccommodationCustomer(accommodationCustomer:accommodationCustomer){
    this.loading=true;
    accommodationCustomer.id=this.store.createId()
    this.store.collection('accommodationCustomers').doc(accommodationCustomer.id).set(accommodationCustomer).then((data)=>{
      this.loading=false
    })
  }
  updateAccommodationCustomer(accommodationCustomer:accommodationCustomer){
    this.loading=true
    this.store.collection('accommodationCustomers').doc(accommodationCustomer.id).update(accommodationCustomer).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteAccommodationCustomer(id:string){
    this.loading=true
    this.store.collection('accommodationCustomers').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }

}
