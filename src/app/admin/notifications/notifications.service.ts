import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Notification} from './notification'
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  NotificationsList:Notification[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getNotifications(){
    this.loading=true
    this.store.collection('notifications').snapshotChanges().subscribe(res =>{
      this.NotificationsList=res.map((d:any)=>{
      const data=d.payload.doc.data()
      this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addNotification(Notification:Notification){
    this.loading=true;
    Notification.id=this.store.createId()
    this.store.collection('notifications').doc(Notification.id).set(Notification).then((data)=>{
      this.loading=false
    })
  }
  updateNotification(Notification:Notification){
    this.loading=true
    this.store.collection('notifications').doc(Notification.id).update(Notification).then((data)=>{
      this.loading=false
    }
    )
  }
  deleteNotification(id:string){
    this.loading=true
    this.store.collection('notifications').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}

