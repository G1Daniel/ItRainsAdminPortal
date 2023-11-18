import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { city } from '../agents/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  citiesList:city[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getCities(){
    this.loading=true
    this.store.collection('cities').snapshotChanges().subscribe(res =>{
      this.citiesList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      return data
     })
   }, err=>{
   })
   this.loading=false
  }
  addCity(city:city){
    this.loading=true;
    city.id=this.store.createId()
    this.store.collection('cities').doc(city.id).set(city).then((data)=>{
      this.loading=false
    })
  }
  updateCity(city:city){
    this.loading=true
    this.store.collection('cities').doc(city.id).update(city).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteCity(id:string){
    this.loading=true
    this.store.collection('cities').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}

