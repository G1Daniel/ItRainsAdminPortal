import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { state } from '../agents/state';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  statesList:state[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getStates(){
    this.loading=true
    this.store.collection('states').snapshotChanges().subscribe(res =>{
      this.statesList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
   }, err=>{
   })
   this.loading=false
  }
  addState(state:state){
    this.loading=true;
    state.id=this.store.createId()
    this.store.collection('states').doc(state.id).set(state).then((data)=>{
      this.loading=false
    })
  }
  updateState(state:state){
    this.loading=true
    this.store.collection('states').doc(state.id).update(state).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteState(id:string){
    this.loading=true
    this.store.collection('states').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}

