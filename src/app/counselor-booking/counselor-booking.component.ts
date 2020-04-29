import { Component, OnInit, Inject } from '@angular/core';
import { CounselorsComponent } from '../counselors/counselors.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../ResponseClasses/dialogDataResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../shared/form-validators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-counselor-booking',
  templateUrl: './counselor-booking.component.html',
  styleUrls: ['./counselor-booking.component.css']
})
export class CounselorBookingComponent implements OnInit {

  submitButton: boolean;
  counselings = new Array;
  daysAvailable = new Array;
  time:string;
  location:string;
  currDate = new Date();
  minDate = new Date(this.currDate.getFullYear(), this.currDate.getMonth(),this.currDate.getDate() + 1);
  maxDate = new Date(this.currDate.getFullYear() + 1, this.currDate.getMonth(), this.currDate.getDate());

  //building the form
  bookingForm = this.fb.group({
    category : ['', Validators.required],
    date : ['', Validators.required]
  });

  //date filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    if(this.daysAvailable.indexOf(day) !== -1) {
      return true;
    }
    else {
      false;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<CounselorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData[],
    private fb:FormBuilder
    ) {}


  //close the dialog
  onNoClick(): void {
    this.dialogRef.close();
  } 

  


  //getters
  get getCategory() {
    return this.bookingForm.get('category');
  }

  get getDate() {
    return this.bookingForm.get('date');
  }

  selectedType(type) {
    //clearing any previous days available
    for (let index = this.daysAvailable.length; index >= 0; index--) {
      this.daysAvailable.pop();  
    }
    //populating the current days available in number format
    this.data.forEach((value) => {
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

  }

  ngOnInit() {
    this.data.forEach((value) => {
      this.counselings.push(value.Type);
    }); 
  }

}
