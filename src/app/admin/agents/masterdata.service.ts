import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { city } from './city';
import { country } from './country';
import { region } from './region';
import { state } from './state';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  cityList:city[]=[]
  regionList:region[]=[]
  stateList:state[]=[]
  countryList:country[]=[]

  constructor(private store:AngularFirestore) { }

  getCities(){
    this.store.collection('cities').snapshotChanges().subscribe(res =>{
      this.cityList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
     console.log(this.cityList)
   }, err=>{
   })
  }
  getRegions(){
    this.store.collection('regions').snapshotChanges().subscribe(res =>{
      this.regionList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
     console.log(this.cityList)
   }, err=>{
   })
  }
  getStates(){
    this.store.collection('states').snapshotChanges().subscribe(res =>{
      this.stateList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
     console.log(this.cityList)
   }, err=>{
   })
  }
  getCountries(){
    this.store.collection('countries').snapshotChanges().subscribe(res =>{
      this.countryList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
     console.log(this.cityList)
   }, err=>{
   })
  }
}
