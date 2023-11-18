import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from './components/menu/menu.service';
import { LoginService } from '../login/login.service';
import { CompanyService } from './company/company.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;
  public userImage = 'assets/admin.jpg';
  public settings:Settings;
  public menuItems:Array<any>;
  public toggleSearchBar:boolean = false;
  constructor(private companyService:CompanyService,public appSettings:AppSettings,
              public router:Router,
              private menuService: MenuService,public loginService:LoginService,private fireauth:AngularFireAuth,private _snackBar:MatSnackBar){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    console.log(role)
    this.companyService.getCompanies()
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    };
    setTimeout(() => {
      this.settings.theme = 'blue';
    });
    this.menuItems = this.menuService.getMenuItems();
  }

  getCompany(id:string){
    const company=this.companyService.CompanyList.find(x=>x.id==id)
    return company!=null?company.name:'Not Found'
  }

  sendResetPasswordLink(){
    const company=this.companyService.CompanyList.find(x=>x.id==this.loginService.userId)
    this.fireauth.sendPasswordResetEmail(company.email).then(async() => {
      this.openSnackBar("Reset password link sent to your email.","ok")
    }).catch((error) => {
      this.openSnackBar("Reset password link not sent.","ok")
    });
  }

  ngAfterViewInit(){
    if(document.getElementById('preloader')){
      document.getElementById('preloader').classList.add('hide');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if(window.innerWidth <= 960){
        this.sidenav.close();
      }
    });
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval);
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {
        window.scrollTo(0,0);
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    else{
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }

  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
   }
}
