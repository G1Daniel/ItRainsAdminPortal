import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  countriesList:Country[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getCountries(){
    this.loading=true
    this.store.collection('countries').snapshotChanges().subscribe(res =>{
      this.countriesList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
   }, err=>{
   })
   this.loading=false
  }
  addCountry(country:Country){
    this.loading=true;
    country.id=this.store.createId()
    this.store.collection('countries').doc(country.id).set(country).then((data)=>{
      this.loading=false
    })
  }
  updateCountry(country:Country){
    this.loading=true
    this.store.collection('countries').doc(country.id).update(country).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteCountry(id:string){
    this.loading=true
    this.store.collection('countries').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
