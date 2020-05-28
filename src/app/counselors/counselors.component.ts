import { Component, OnInit, Sanitizer } from '@angular/core';
import { GetAllUsers } from '../ResponseClasses/getAllUsers';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { CounselorBookingComponent } from '../counselor-booking/counselor-booking.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GetSeeker } from '../ResponseClasses/getSeeker';
import { jwtDeocde } from '../shared/jwt-decode';

@Component({
  selector: 'app-counselors',
  templateUrl: './counselors.component.html',
  styleUrls: ['./counselors.component.css']
})
export class CounselorsComponent implements OnInit {

  constructor(private _apiservice: ApiService, public dialog: MatDialog, private _route: Router, private _snack: MatSnackBar) { }

  blurBackground :  boolean = false;
  allUsers:GetAllUsers;
  counselors:any;
  filteredCounselors : any;
  seekerDetails : any;
  

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


    if ( localStorage.getItem('jwt') !== null ) {
      let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
      this._apiservice.getUser(token.id)
      .subscribe (
        data =>  { 
          this.seekerDetails = data;
          // console.log(this.seekerDetails); 
        },
        error => console.log(error)
      )
    }
    
    
    
    

  }

  openDialog(counselor, id, bookings): void {
    // console.log(bookings);

    let token = localStorage.getItem('jwt');
    if(token == null) {
      this.openSnackBar();
      this._route.navigate([{ outlets: { mainOutlet: ['login'] } }]);
    }
    else {
      this.blurBackground = true;
      const dialogRef = this.dialog.open( CounselorBookingComponent, {
        width: "fit-content",
        data: { 'counselor' : counselor.availability, 'seeker' : this.seekerDetails.data.bookings, 'seekerId' : this.seekerDetails.data.id, 'counselorBookings' : bookings},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.blurBackground = false;
        console.log('The dialog was closed');
      });
    }
  }

  openSnackBar() {
    this._snack.open('PLEASE LOGIN TO BOOK APPOINTMENT', '', { 
      duration : 3000,
      verticalPosition: 'bottom',
      panelClass: ['snack-bar']
     });
  }

  saveUsers(data) {
    this.allUsers = data;
    this.counselors = this.allUsers.data;
    this.filteredCounselors = this.counselors;
  }

}
