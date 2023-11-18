import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  customersList:Customer[]=[]
  loading:boolean=false

  constructor(private store:AngularFirestore) { }

  getCustomers(){
    this.loading=true
    this.store.collection('customers').snapshotChanges().subscribe(res =>{
      this.customersList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      this.loading=false
      return data
     })
   }, err=>{
   })
  }
  addCustomer(customer:Customer){
    this.loading=true;
    customer.id=this.store.createId()
    this.store.collection('customers').doc(customer.id).set(customer).then((data)=>{
      this.loading=false
    })
  }
  updateCustomer(customer:Customer){
    this.loading=true
    this.store.collection('customers').doc(customer.id).update(customer).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteCustomer(id:string){
    this.loading=true
    this.store.collection('customers').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}

