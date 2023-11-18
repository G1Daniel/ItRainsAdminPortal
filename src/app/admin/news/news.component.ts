import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { News } from './news';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  searchKey:string=''
  searchList:News[]=[]
  public settings:Settings;
  constructor(public newsService:NewsService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.newsService.getNews()
    console.log(this.newsService.newsList.length)
  }

  getAllNewsList(){
    if(this.searchKey!==''){
      this.searchList= this.newsService.newsList.filter(x=>x.title.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.newsService.newsList
  }



  public openNewsDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(NewsDialogComponent, {
    data: {
      news:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(News => {
    if(News){
      const index: number = this.getAllNewsList().findIndex(x => x.id == News.id);
        console.log(index)
        if(index !== -1){
          this.newsService.updateNews(News)
          this.getAllNewsList()[index] = News
          this.openSnackBar("News information updated successfudly","ok")
          return
        }
        else{
          this.getAllNewsList().push(News)
          this.newsService.addNews(News)
          this.openSnackBar("New News has been addeddsuccessfully","ok")
          return
        }
    }

  }
  );
}



public remove(News:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this News?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllNewsList().indexOf(News);
      if (index !== -1) {
        this.newsService.deleteNews(News.id)
        this.getAllNewsList().splice(index, 1)
      }
    }
  });
}

 openSnackBar(message:string, action:string){
  this._snackBar.open(message,action)
 }

 public page: any;
 public count = 6;
 public onPageChanged(event){
  this.page = event;
  window.scrollTo(0,0);
}

}


