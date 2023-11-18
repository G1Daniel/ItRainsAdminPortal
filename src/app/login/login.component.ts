import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppSettings, Settings } from '../app.settings';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //width:number=window.innerWidth;
  userName:string=''
  password:string=''
  public settings:Settings;
  constructor(private router:Router,public authService:LoginService,public dialog:MatDialog, public appSettings:AppSettings) {
    this.settings=appSettings.settings
   }

  async ngOnInit(): Promise<void> {
    await localStorage.setItem('isLoggedIn','false')
    this.authService.userId=''
    this.authService.role=''
    await localStorage.setItem('role','')

  }


  async login(){
    // this.authService.isAuthenticated=true;
    // await this.router.navigate(['/admin'])
    //if(this.form.email==""||this.form.password==""||this.form.password.length<4) return;
    this.authService.login(this.userName,this.password);
  }

  isLoading(){
    return this.authService.loading;
  }

  getErrorMessage(){
    return this.authService.errorMessage;
  }
}

