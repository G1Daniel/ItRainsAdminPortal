import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Agent } from './agent';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  agentsList:Agent[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getAgents(){
    // this.loading=true
    this.store.collection('agents').snapshotChanges().subscribe(res =>{
      this.agentsList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
   })
  }
  addAgent(agent:Agent){
    this.loading=true;
    agent.id=this.store.createId()
    this.store.collection('agents').doc(agent.id).set(agent).then((data)=>{
      this.loading=false
    })
  }
  updateAgent(agent:Agent){
    this.loading=true
    this.store.collection('agents').doc(agent.id).update(agent).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteAgent(id:string){
    this.loading=true
    this.store.collection('agents').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
