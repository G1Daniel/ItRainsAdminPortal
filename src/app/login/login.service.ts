import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  loading: boolean =false;
  errorMessage:string='';
  role:string=''
  isAuthenticated: boolean=false;
  userId:string=''
  constructor(private router:Router,private fireauth:AngularFireAuth,private store: AngularFirestore,private _snackBar:MatSnackBar) { }




  persistData(){
    this.role=localStorage.getItem('role')
    this.userId=localStorage.getItem('userId')
  }

  login(email:string,password:string){
    if(this.loading) return;
    this.loading=true;
    //const auth = getAuth();
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.store.collection('companies',ref=>ref.where('email','==',email)).get().subscribe(async (doc)=>{
          if(doc.docs.length>0){
            this.isAuthenticated=true;
            console.log(doc.docs[0].data()['role'])
            this.role=doc.docs[0].data()['role']
            await localStorage.setItem('role',doc.docs[0].data()['role'])
            if(doc.docs[0].data()['role']=='admin'){
              await localStorage.setItem('isLoggedIn','true')
              this.userId=doc.docs[0].data()['id']
              await localStorage.setItem('userId',this.userId)
              this.openSnackBar("Logged in successfully","ok")
              await localStorage.setItem('role','admin')
              await this.router.navigate(['/admin']);
              this.loading=false;
            }
            else if(doc.docs[0].data()['role']=='charity'){
              await localStorage.setItem('isLoggedIn','true')
              this.userId=doc.docs[0].data()['id']
              await localStorage.setItem('userId',this.userId)
              await localStorage.setItem('role','charity')
              await this.router.navigate(['/admin']);
              this.openSnackBar("Charity Organization Logged in successfully","ok")
              return
            }
          }
          else{
            this.loading=false;
            this.errorMessage='No user found for that email address.';
            this.openSnackBar(this.errorMessage,"ok")
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(error.code=='auth/user-not-found'){
          this.errorMessage='No user found for that email address.';
          this.openSnackBar(this.errorMessage,"ok")
        }
        if(error.code=="auth/wrong-password"){
          this.errorMessage='Wrong password provided for that user.';
          this.openSnackBar(this.errorMessage,"ok")
        }
        this.isAuthenticated=false;
      }).finally(()=>{
        this.loading=false;
      });
  }

  signUp(email:string){
    if(this.loading) return;
    //this.loading=true;
    //const auth = getAuth();
    this.fireauth.signOut().then(()=>{
      this.fireauth.createUserWithEmailAndPassword(email, '123400')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //this.fireauth.signOut()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(error.code=='auth/email-already-in-use'){
          this.errorMessage='Username already in use.';
        }
      }).finally(()=>{
        //this.loading=false;
      })
    })
  }


  logout(){
    //const auth = getAuth();
    this.fireauth.signOut().then(async() => {
      localStorage.setItem('isLoggedIn','false')
      await this.router.navigate(['']);
      this.isAuthenticated=false;
      //location.reload()
    }).catch((error) => {
      // An error happened.
    });
  }

  isUserLoggedIn(){
    const user=localStorage.getItem('isLoggedIn')
    return user=='true' ? true:false
  }

  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
   }
}
