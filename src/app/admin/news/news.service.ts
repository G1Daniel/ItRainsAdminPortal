import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsList:News[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getNews(){
    this.loading=true
    this.store.collection('news').snapshotChanges().subscribe(res =>{
      this.newsList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addNews(News:News){
    this.loading=true;
    News.id=this.store.createId()
    this.store.collection('news').doc(News.id).set(News).then((data)=>{
      this.loading=false
    })
  }
  updateNews(News:News){
    this.loading=true
    this.store.collection('news').doc(News.id).update(News).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteNews(id:string){
    this.loading=true
    this.store.collection('news').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
