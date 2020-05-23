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

  blurBackground :  boolean = false;
  allUsers:GetAllUsers;
  counselors:any;
  filteredCounselors : any;
  

  myFilter(searchValue) {
    if( searchValue != '') {
      this.filteredCounselors = this.counselors.filter(function(counselor) {
        var result : boolean = false;
        var searchSpace = counselor.availability;
        if( searchSpace != null ) {
          for ( var i = 0; i < searchSpace.length ; i++ ) {
            var typeResult = searchSpace[i].Type.match(new RegExp(searchValue, "i"));
            if( typeResult != null) {
              if(typeResult['index'] == 0) {
                result = true;
                break;
              } 
            }
          }
        }
        return result;
      });
    }
    else {
      this.filteredCounselors = this.counselors;
    }
    
  }



  ngOnInit() {
    this._apiservice.getallusers()
    .subscribe(
      data=> this.saveUsers(data),
      error=> console.log(error)
    );
    

  }

  openDialog(counselor): void {
    this.blurBackground = true;
    const dialogRef = this.dialog.open( CounselorBookingComponent, {
      width: "fit-content",
      data: counselor.availability
    });

    dialogRef.afterClosed().subscribe(result => {
      this.blurBackground = false;
      console.log('The dialog was closed');
    });
  }

  saveUsers(data) {
    this.allUsers = data;
    this.counselors = this.allUsers.data;
    this.filteredCounselors = this.counselors;
  }

}
