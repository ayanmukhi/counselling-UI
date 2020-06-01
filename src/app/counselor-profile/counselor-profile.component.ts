import { Component, OnInit, NgModule, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { jwtDeocde } from '../shared/jwt-decode';
import { ApiService } from '../api.service';
import { GetCounselor } from '../ResponseClasses/getCounselor';
import { GetAppointedSeeker } from '../ResponseClasses/getAppointedSeeker';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CousnelorUpdateComponent } from '../cousnelor-update/cousnelor-update.component';
import { Routes, RouterModule, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SlicePipe } from '@angular/common';
import { NewAvailabilityDialogComponent } from '../new-availability-dialog/new-availability-dialog.component';



@Component({
  selector: 'app-counselor-profile',
  templateUrl: './counselor-profile.component.html',
  styleUrls: ['./counselor-profile.component.css']
})
export class CounselorProfileComponent implements OnInit, OnDestroy {

  appointmentType : any;
  

  seekerFetch : boolean;
  seekerDetails : GetAppointedSeeker;
  profile:boolean;
  personalDetails:boolean = true;
  bookingsDetails:boolean = false;
  edit:boolean = false;
  date:Date;
  step:number = 0;
  public name:string;
  counselorDetails:GetCounselor;  
  public destroyed = new Subject<any>();
  percentageDone : number = 0;
  progressBarDisplay : boolean = false;
  selectedfile : File;
  fileSelectionComplete : boolean = false;
  title : boolean = false;
  @ViewChild('file', {static: false}) file : ElementRef;
  titleValue : string;
  fileTypeError : boolean = false;
  fileTypeErrorMessage : string = 'File must be video';
  

  constructor(private _api:ApiService, public counselorDialog: MatDialog, private _route: Router, private _fb: FormBuilder, private _snack: MatSnackBar) {}

  ngOnInit() {
    let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
      this._api.getUser(token.id)
      .subscribe(
        data => this.saveCounselorData(data),
        error => console.log(error)
      );
    
  }


  checkLength(event) {
    if( ((event.target.value).length) > 0) {
      this.title = true;
      this.titleValue = event.target.value;
      
    }
  }

  deleteAccount() {
    let result = confirm("Are you sure to delete this");
    if( result ) {
      this._api.deleteUser(this.counselorDetails.data.id)
      .subscribe(
        data => {
          localStorage.clear();
          this._route.navigate([{ outlets: { mainOutlet: null } }]);
         },
        error => console.log(error)
      )
    }
  }
  

  onFileChanged(event) {
    console.log(event.target.files.length);
    if( event.target.files.length >= 1 ) {
      this.selectedfile = event.target.files[0];
      if (this.selectedfile.type.includes('video')) {
          event.target.value = '';
          this.fileSelectionComplete = true;
          event.target.files = null;
          this.fileTypeError = false;
      } 
      else {
        this.fileTypeError = true;
        event.target.files = null;
      }
    }
  }

  getFIle() {
    document.getElementById("uploadBtn").click();
  }

  openSnackBar( message: string) {
    this._snack.open(message, '', { 
      duration : 3000,
      verticalPosition: 'bottom',
      panelClass: ['snack-bar']
     });
  }

  onSubmit() {
    console.log(this.selectedfile);
    const uploadFile = new FormData();

    uploadFile.append('myFile', this.selectedfile, this.selectedfile.name);
    if( this.titleValue == null || this.titleValue == '') {
      uploadFile.append('fileTitle', (this.selectedfile.name).slice(0, -4) );
    } else {
      uploadFile.append('fileTitle', this.titleValue);
    }
    uploadFile.append('fileExt', this.selectedfile.type);
    this._api.postUploadFile(uploadFile).subscribe(
      event => {
        if ( event.type === HttpEventType.UploadProgress ) {
          this.progressBarDisplay = true;
          const percentDone = Math.round( 100 * event.loaded / event.total );
          this.percentageDone = percentDone;
          console.log( " FILE UPLOADED : " + percentDone );
        }
        if( event instanceof HttpResponse ) {
          console.log( "RESPONSE AFTER")
          console.log(event);
          this.fileSelectionComplete = false;
          this.progressBarDisplay = false;
          this.selectedfile = null;
          this.titleValue = '';
          this.title = false;
          this.openSnackBar("FILE SUCCESSFULLY UPLOADED");
        }
      }
    )
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getDimension(event) {
    console.log("dimension : " + event.path[0].width);
    event.path[0].height = event.path[0].width;
  }

  saveCounselorData(counselor) {
    this.counselorDetails = counselor;
    console.log(this.counselorDetails);
    this.profile = true;

  }
  
  details(specifics) {
    if( specifics == "personal") {
      this.personalDetails = true;
      this.bookingsDetails = false;
      this.edit = false;
    }
    else if( specifics == "all-bookings" ) {
      
      this.personalDetails = false;
      this.bookingsDetails = true;
      this.edit = false;
    }
    else {
      this.personalDetails = false;
      this.bookingsDetails = false;
      this.edit = true;
    }
    //console.log("personal : " + this.personalDetails + "\nbookings : " + this.bookingsDetails + "\nedit : " + this.edit);
  }


  appointmentDetails( seekerId, availabilityId) {
    let tempAppointment = this.counselorDetails.data.availability.filter(function(availability) {
      console.log(availability.Id);
      if( availabilityId == availability.Id ) {
        console.log("matched");
        return true;
      }
    });
    this.appointmentType = tempAppointment[0];
    console.log("avail : " + this.appointmentType);

    this._api.getAppointedUser(seekerId)
    .subscribe(
      data => this.saveSeekerDetails(data),
      error => console.log(error)
    );

  }

  saveSeekerDetails( data ) {
    this.seekerDetails = data;
    console.log(this.seekerDetails.data.clientName);
    this.seekerFetch = true;
  } 


  dialogOpen() {
    console.log("openning diaog");
    var dialog = this.counselorDialog.open(CousnelorUpdateComponent, {
      data : this.counselorDetails
    }); 
    dialog.afterClosed().subscribe(
      result => {
         console.log( "refreshing the data");
         let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
         this._api.getUser(token.id)
         .subscribe(
           data => this.saveCounselorData(data),
           error => console.log(error)
         );
      }
    );
    
  }

  editAvailability( id ) {
    console.log( id );
    var dialog = this.counselorDialog.open( NewAvailabilityDialogComponent, { 
      data : { 
        id : this.counselorDetails.data.id,
        oldAvailabilities : this.counselorDetails.data.availability,
        updating : true,
        availId : id
      }
     });
     dialog.afterClosed().subscribe(
      result => {
         console.log( "refreshing the data");
         let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
         this._api.getUser(token.id)
         .subscribe(
           data => {
             this.saveCounselorData(data);
           },
           error => console.log(error)
         );
      }
    );
  }

  deleteAvailability( id ) {
    let result = confirm("Are you sure to delete this counseling type of yours");
    if( result ) {
      this._api.deleteAvailability(id)
      .subscribe(
        data => {
          console.log(data);
          let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
          this._api.getUser(token.id)
          .subscribe(
            data => {
              this.saveCounselorData(data);
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      )
    }
  }


  addAvailability() {
    console.log("add availibility");
    var dialog  = this.counselorDialog.open( NewAvailabilityDialogComponent, { 
      data : { 
        id : this.counselorDetails.data.id,
        oldAvailabilities : this.counselorDetails.data.availability,
        updating : false,
        availId : null
      }
     });  
     
     dialog.afterClosed().subscribe(
       result => {
          console.log( "refreshing the data");
          let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
          this._api.getUser(token.id)
          .subscribe(
            data => {
              this.saveCounselorData(data);
            },
            error => console.log(error)
          );
       }
     );
  }
  

}
