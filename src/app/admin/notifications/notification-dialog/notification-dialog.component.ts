import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,public NotificationService:NotificationsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
   this.form.patchValue(this.data.Notification);
  }

  public onSubmit(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }


}


