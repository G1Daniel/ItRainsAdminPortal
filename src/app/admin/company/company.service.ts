import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  CompanyList:Company[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getCompanies(){
    this.loading=true
    this.store.collection('companies').snapshotChanges().subscribe(res =>{
      this.CompanyList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addCompany(Company:Company){
    this.loading=true;
    Company.id=this.store.createId()
    this.store.collection('companies').doc(Company.id).set(Company).then((data)=>{
      this.loading=false
    })
  }
  updateCompany(Company:Company){
    this.loading=true
    this.store.collection('companies').doc(Company.id).update(Company).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteCompany(id:string){
    this.loading=true
    this.store.collection('companies').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
