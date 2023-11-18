import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DeliveryType } from './delivery-type';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService {

  deliveryTypesList:DeliveryType[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getdeliveryTypes(){
    this.loading=true
    this.store.collection('deliveryTypes').snapshotChanges().subscribe(res =>{
      this.deliveryTypesList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addDeliveryType(deliveryType:DeliveryType){
    this.loading=true;
    deliveryType.id=this.store.createId()
    this.store.collection('deliveryTypes').doc(deliveryType.id).set(deliveryType).then((data)=>{
      this.loading=false
    })
  }
  updateDeliveryType(deliveryType:DeliveryType){
    this.loading=true
    this.store.collection('deliveryTypes').doc(deliveryType.id).update(deliveryType).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteDeliveryType(id:string){
    this.loading=true
    this.store.collection('deliveryTypes').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
