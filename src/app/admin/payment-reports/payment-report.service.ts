import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaymentReport } from './payment-report';

@Injectable({
  providedIn: 'root'
})
export class PaymentReportService {
  PaymentReportList:PaymentReport[]=[]
  loading:boolean=false
  constructor(private store:AngularFirestore) { }

  getPaymentReports(){
    this.loading=true
    this.store.collection('paymentReports').snapshotChanges().subscribe(res =>{
      this.PaymentReportList=res.map((d:any)=>{
      const data=d.payload.doc.data()
     this.loading=false
      return data
     })
   }, err=>{
    this.loading=false
   })
   this.loading=false
  }
  addPaymentReport(PaymentReport:PaymentReport){
    this.loading=true;
    PaymentReport.id=this.store.createId()
    this.store.collection('paymentReports').doc(PaymentReport.id).set(PaymentReport).then((data)=>{
      this.loading=false
    })
  }
  updatePaymentReport(PaymentReport:PaymentReport){
    this.loading=true
    this.store.collection('paymentReports').doc(PaymentReport.id).update(PaymentReport).then((data)=>{
      this.loading=false
    }
    )
  }
  deletePaymentReport(id:string){
    this.loading=true
    this.store.collection('paymentReports').doc(id).delete().then((data)=>{
      this.loading=false
    }
    )
  }
}
