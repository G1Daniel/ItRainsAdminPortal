import { Component, OnInit } from '@angular/core';
import { Notification } from './notification';
import { NotificationsService } from './notifications.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings,AppSettings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  searchKey:string=''
  searchList:Notification[]=[]
  public settings:Settings;
  constructor(public NotificationService:NotificationsService,private store:AngularFirestore, public appSettings:AppSettings,public dialog: MatDialog,private _snackBar:MatSnackBar) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.NotificationService.getNotifications()
    console.log(this.NotificationService.NotificationsList.length)
  }

  getAllNotificationList(){
    if(this.searchKey!==''){
      this.searchList= this.NotificationService.NotificationsList.filter(x=>x.title.toLowerCase().includes(this.searchKey.toLocaleLowerCase()))
      return this.searchList
     }
    return this.NotificationService.NotificationsList
  }



  public openNotificationDialog(data:any,isNew:boolean){let name='';

  const dialogRef = this.dialog.open(NotificationDialogComponent, {
    data: {
      Notification:data,
      isNew:isNew
    },
    panelClass: ['theme-dialog'],
    autoFocus: false,
    direction: (this.settings.rtl) ? 'rtl' : 'ltr'
  });

  dialogRef.afterClosed().subscribe(Notification => {
    if(Notification){
      const index: number = this.getAllNotificationList().findIndex(x => x.id == Notification.id);
        console.log(index)
        if(index !== -1){
          this.NotificationService.updateNotification(Notification)
          this.getAllNotificationList()[index] = Notification
          this.openSnackBar("Notification information updated successfudly","ok")
          return
        }
        else{
          this.getAllNotificationList().push(Notification)
          this.NotificationService.addNotification(Notification)
          this.openSnackBar("New Notification has been addedd successfully","ok")
          return
        }
    }

  }
  );
}



public remove(Notification:any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want remove this Notification type?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult){
      const index: number = this.getAllNotificationList().indexOf(Notification);
      if (index !== -1) {
        this.NotificationService.deleteNotification(Notification.id)
        this.getAllNotificationList().splice(index, 1)
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
