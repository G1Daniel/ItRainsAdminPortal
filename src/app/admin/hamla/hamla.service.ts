import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Hamla } from './hamla';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HamlaService {

  hamlasList:Hamla[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getHamlas(){
    this.loading=true
    this.store.collection('hamlas').snapshotChanges().subscribe(res =>{
      this.hamlasList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
   }, err=>{
   })
   this.loading=false
  }
  addHamla(Hamla:Hamla){
    this.loading=true;
    Hamla.id=this.store.createId()
    this.store.collection('hamlas').doc(Hamla.id).set(Hamla).then((data)=>{
      this.loading=false
    })
  }
  updateHamla(Hamla:Hamla){
    this.loading=true
    this.store.collection('hamlas').doc(Hamla.id).update(Hamla).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteHamla(id:string){
    this.loading=true
    this.store.collection('hamlas').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
