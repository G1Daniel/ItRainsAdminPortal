import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  RequestList:Request[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getRequests(){
    this.loading=true
    this.store.collection('requests',ref=>ref.where('isOffered','==',false)).snapshotChanges().subscribe(res =>{
      this.RequestList=res.map((d:any)=>{
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


