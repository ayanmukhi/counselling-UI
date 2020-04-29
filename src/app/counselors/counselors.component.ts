import { Component, OnInit } from '@angular/core';
import { GetAllUsers } from '../ResponseClasses/getAllUsers';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { CounselorBookingComponent } from '../counselor-booking/counselor-booking.component';

@Component({
  selector: 'app-counselors',
  templateUrl: './counselors.component.html',
  styleUrls: ['./counselors.component.css']
})
export class CounselorsComponent implements OnInit {

  constructor(private _apiservice: ApiService, public dialog: MatDialog) { }

  allUsers:GetAllUsers;
  counselors:any;
  availability:any[];
  

  ngOnInit() {
    this._apiservice.getallusers()
    .subscribe(
      data=> this.saveUsers(data),
      error=> console.log(error)
    );

  }

  openDialog(counselor): void {
    const dialogRef = this.dialog.open( CounselorBookingComponent, {
      width: "fit-content",
      data: counselor.availability
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  saveUsers(data) {
    this.allUsers = data;
    this.counselors = this.allUsers.data;
  }

}
