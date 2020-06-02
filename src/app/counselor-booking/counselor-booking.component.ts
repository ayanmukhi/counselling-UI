import { Component, OnInit, Inject } from '@angular/core';
import { CounselorsComponent } from '../counselors/counselors.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../ResponseClasses/dialogDataResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../shared/form-validators';
import { timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CounselorProfileComponent } from '../counselor-profile/counselor-profile.component';
import { ApiService } from '../api.service';
import { error } from 'protractor';
import { MatSnackBar } from '@angular/material';

// interface dialogData {

//   counselor : [
//     {
//       Id : string,
//       Status:string,
//       Time:string,
//       Day:[string],
//       Type:string,
//       Location:string,
//       Rating:string
//     }
//   ],
//   seeker : [
//     {
//       SeekerId : string,
//       Date : Date,
//       AvailabilityId : string
//     }
//   ],
//   seekerId : number;
//   counselorBookings : [
//     {
//       Date : Date,
//     }
//   ]
// }


@Component({
  selector: 'app-counselor-booking',
  templateUrl: './counselor-booking.component.html',
  styleUrls: ['./counselor-booking.component.css']
})
export class CounselorBookingComponent implements OnInit {

  submitButton : boolean;
  counselings = new Array;
  daysAvailable = new Array;
  time : string;
  counselorBookings =  new Array;
  availabilityId : number;
  seekerId : string;
  
  location:string;
  currDate = new Date();
  minDate = new Date(this.currDate.getFullYear(), this.currDate.getMonth(),this.currDate.getDate() + 1);
  maxDate = new Date(this.currDate.getFullYear() + 1, this.currDate.getMonth(), this.currDate.getDate());
  seekerDaysAvailable = new Array;

  //building the form
  bookingForm = this.fb.group({
    category : ['', Validators.required],
    date : ['', Validators.required],

  });

  //getters
  get getCategory() {
    return this.bookingForm.get('category');
  }

  get getDate() {
    return this.bookingForm.get('date');
  }

  //date filter
  myFilter = (d: Date | null): boolean => {
    var found : boolean = false;
    const day = (d || new Date()).getDay();
    const date = this._datePipe.transform(( d || new Date()), 'MM/dd/yyyy');
    if(this.daysAvailable.indexOf(day) !== -1 ) {

      for ( let i = 0 ; i < this.data.seeker.length; i++ ) {
        let booking = this.data.seeker[i]; 
        if( booking.Date.toString() == date ) {
          found = true;
         // console.log(date + ' ' + booking.Date.toString() + ' ' + true);
          break;
        }
      }
      if( !found ) {
        for ( let i = 0; i < this.counselorBookings.length; i++ ) {
          let booking = this.counselorBookings[i];
          if( booking.toString() == date ) {
            found = true;
            break;
          }
        }
      }
      if( !found ) {
       // console.log("reaching here on : " + date);
        return true;
      }
      else {
        return false;
      }
      
    }
    else {
      false;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<CounselorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _datePipe : DatePipe,
    private fb:FormBuilder,
    private _apiService : ApiService,
    private _snack: MatSnackBar
    ) {}


  //close the dialog
  onNoClick(): void {
    this.dialogRef.close();
  } 

  
  

  selectedType(type, id) {
    this.availabilityId = id;
    //clearing any previous days available
    for (let index = this.daysAvailable.length; index >= 0; index--) {
      this.daysAvailable.pop();  
    }

    
    //populating the current days available in number format
    this.data.counselor.forEach((value) => {
      if(value.Type == type ) {
      this.time = value.Time;
      this.location = value.Location;
        value.Day.forEach((day) => {
          switch (day) {
            case "Monday":
              this.daysAvailable.push(1);
              break;
            case "Tuesday":
              this.daysAvailable.push(2);
              break;
            case "Wednesday":
              this.daysAvailable.push(3);
              break;
            case "Thursday":
              this.daysAvailable.push(4);
              break;
            case "Friday":
              this.daysAvailable.push(5);
              break;
            case "Saturday":
              this.daysAvailable.push(6);
              break;
            case "Sunday":
              this.daysAvailable.push(0);
              break;
            default:
              break;
          }
        });
      }
    });
  }

  submit() {
    //console.log( this.bookingForm.value);
    let formData = this.bookingForm.value;
    formData.seekerId = this.seekerId;
    formData.availabilityId = this.availabilityId;
    formData.date = this._datePipe.transform(formData.date, 'yyyy-MM-dd');
    console.log(formData); 
    this._apiService.makeAppoinment(formData)
    .subscribe (
      data => {
        this.openSnackBar();
        this.dialogRef.close();
      },
      error => console.log(error),
    )

  }


  openSnackBar() {
    this._snack.open('APPOINTMENT IS MADE', '', { 
      duration : 3000,
      verticalPosition: 'bottom',
      panelClass: ['snack-bar']
     });
  }


  ngOnInit() {
    // console.log( this.data);
    this.seekerId = this.data.seekerId;
    
    console.log(this.seekerId);
    this.data.counselor.forEach((value) => {
      this.counselings.push({
        type : value.Type,
        availabilityId : value.AvailabilityId 
      });
    }); 

    
    this.data.counselor.forEach(bookings => {
      bookings.forEach( booking => {
        this.counselorBookings.push(booking);
      });
    });
    
    console.log( "seeker Id : ");
    
  }

}
