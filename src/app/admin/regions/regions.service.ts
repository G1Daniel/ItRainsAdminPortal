import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { region } from '../agents/region';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  regionsList:region[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getRegions(){
    this.loading=true
    this.store.collection('regions').snapshotChanges().subscribe(res =>{
      this.regionsList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
   }, err=>{
   })
   this.loading=false
  }
  addRegion(region:region){
    this.loading=true;
    region.id=this.store.createId()
    this.store.collection('regions').doc(region.id).set(region).then((data)=>{
      this.loading=false
    })
  }
  updateRegion(region:region){
    this.loading=true
    this.store.collection('regions').doc(region.id).update(region).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteRegion(id:string){
    this.loading=true
    this.store.collection('regions').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}

