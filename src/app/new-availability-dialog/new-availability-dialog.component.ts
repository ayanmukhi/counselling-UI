import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, NgModel, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { min } from 'rxjs/operators';
import { nameValidator } from '../shared/form-validators';
import { ApiService } from '../api.service';


interface ModalData {
  oldAvailabilities : [
    {
      Id : string,
      Status : string,
      Time : string,
      Day : string[],
    }
  ],
  id : string,
  availId : {
    Day : string[],
    Id : string,
    Location : string,
    Time : string,
    Type : string
  },
  updating : string
}



@Component({
  selector: 'app-new-availability-dialog',
  templateUrl: './new-availability-dialog.component.html',
  styleUrls: ['./new-availability-dialog.component.css']
})


export class NewAvailabilityDialogComponent implements OnInit {

  time : any;
  avaialbilityResponse : InsertAvailability;
  days  = [  
    { name : "Sunday", checked : false },
    { name : "Monday", checked : false },
    { name : "Tuesday", checked : false },
    { name : "Wednesday", checked : false },
    { name : "Thursday", checked : false },
    { name : "Friday", checked : false },
    { name : "Saturday", checked : false }];
  checkboxError : boolean  = true; 
  selectedDay = [];
  selectedTime : Date;
  selectedType : string;
  selectedLocation : string;
  newAvailabilityForm : any;
  currentAvailId : string;
  duplicate : boolean = false;
  duplicateMsg : string;


  constructor(
    public availabilityDialogRef : MatDialogRef<NewAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private counselorData : ModalData,
    private _fb : FormBuilder,
    private _datePipe : DatePipe,
    private _apiService : ApiService
  ) { }

  

  ngOnInit() {    
    // console.log(this.selectedTime);

    if( this.counselorData.updating ) {


      //parsing the old availabilities
      this.selectedDay = this.counselorData.availId.Day;
      var hour = this.counselorData.availId.Time.substr(0,2);
      var minute = this.counselorData.availId.Time.substr(-2);
      this.selectedTime =new Date(0, 0, 0, parseInt(hour), parseInt(minute), 0);
      this.time = hour + ":" + minute;
      this.selectedType = this.counselorData.availId.Type;
      this.selectedLocation = this.counselorData.availId.Location;
      this.currentAvailId = this.counselorData.availId.Id;

      console.log( this.selectedTime);

    }

    this.selectedDay.forEach(day => {
      for( var i = 0 ; i < this.days.length ; i++ ) {
        if( day == this.days[i].name ) {
          this.days[i].checked = true;
          this.checkboxError = false;
          break;
        }
      }  
    });

    this.newAvailabilityForm = this._fb.group({
      time: [this.selectedTime, [Validators.required]],
      type: [this.selectedType, [Validators.required, nameValidator]],
      location: [this.selectedLocation, [Validators.required, nameValidator]]
    });

    
  }

  


  //closing the dialog
  closeDialog() {
    this.availabilityDialogRef.close();
  }


  get getLocation() {
    return this.newAvailabilityForm.get('location');
  }

  get getTime() {
    return this.newAvailabilityForm.get('time');
  }

  get getType() {
    return this.newAvailabilityForm.get('type');
  }



  // function to check time old time on same day
  checkTime( date ) {
    this.time = ((date.value).toString()).slice(16, 21);
    console.log(this.time);
    this.duplicate = false;
    
  }



  //submit the data
  availabilitySubmit() {
    var newForm = this.newAvailabilityForm.value; 
    newForm.time = this.time;
    newForm.day = this.selectedDay;
    newForm.counselor_id = this.counselorData.id;
    console.log( newForm ); 
    var found : boolean = false;
      for( let i = 0; i < this.selectedDay.length; i++ ) {
        for( let j = 0; j < this.counselorData.oldAvailabilities.length; j++ ) {
          
         // console.log( "time : " + this.time + "      day : " + this.selectedDay[i] + "      ID : " + this.currentAvailId);
          for( let k = 0; k < this.counselorData.oldAvailabilities[j].Day.length; k++ ) {
           // console.log( this.counselorData.oldAvailabilities[j].Day[k]);
            if( this.counselorData.oldAvailabilities[j].Day[k] == this.selectedDay[i] && this.counselorData.oldAvailabilities[j].Time == this.time && this.counselorData.oldAvailabilities[j].Id != this.currentAvailId ) {
              found = true;
              this.duplicateMsg = " You already have made criteria on " + this.counselorData.oldAvailabilities[j].Day[k] + " at " + this.counselorData.oldAvailabilities[j].Time;
              break;
            }
          }
          if ( found ) {
            break;
          }
        }
        if( found ) {
          break;
        }
      }
      if( found ) {
        console.log( " match found ");
        this.duplicate = true;
      }
      else {
        console.log( " match not found ");
        if( this.counselorData.updating ) {
          console.log( " updating ");
          
          newForm.availId = this.currentAvailId;
          console.log( newForm );
          this._apiService.updateAvailability(newForm)
          .subscribe(
            data => {
              this.closeDialog();
              console.log( data );
            },
            error => console.log( error ),
          )
        }
        else {
          this._apiService.newAailability( newForm ) 
          .subscribe(
            data => {
              this.avaialbilityResponse = data;
              if( this.avaialbilityResponse.success) {
                this.closeDialog();
              }
              else {
                console.log( this.avaialbilityResponse.AvailabilityRecordCreation);
              }
            },
            error => console.log( error ),
          )
        }
      }
    
  }


  //function to add or remove from checkbox array
  checkboxValue( event ) {
    console.log( "day : " + event.target.value);
    this.duplicate = false;
    let index = this.selectedDay.indexOf( event.target.value );
    if( index == -1 ) {
      this.selectedDay.push( event.target.value );
      this.checkboxError = false;
    }
    else {
      var newSelectedDay = [];
      for ( var i = 0; i < this.selectedDay.length; i++ ) {
        if( i != index ) {
          newSelectedDay.push( this.selectedDay[i] ); 
        }
      }
      this.selectedDay = newSelectedDay;
      if( this.selectedDay.length == 0) {
        this.checkboxError = true;
      }
    }
    console.log( this.selectedDay);
  }

}
