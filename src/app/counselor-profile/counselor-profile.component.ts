import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
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
  
  constructor(private _api:ApiService, public counselorDialog: MatDialog, private _route: Router, private _fb: FormBuilder, private _snack: MatSnackBar) {}

  ngOnInit() {
    let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
      this._api.getUser(token.id)
      .subscribe(
        data => this.saveCounselorData(data),
        error => console.log(error)
      );
    
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
    if( event.target.files.length >= 1 ) {
      this.selectedfile = event.target.files[0];
      this.fileSelectionComplete = true;
    }
  }

  getFIle() {
    document.getElementById("uploadBtn").click();
  }

  openSnackBar( message: string) {
    this._snack.open(message, '', { 
      duration : 200000,
      verticalPosition: 'bottom',
      panelClass: ['snack-bar']
     });
  }

  onSubmit() {
    console.log(this.selectedfile);
    const uploadFile = new FormData();
    uploadFile.append('myFile', this.selectedfile, this.selectedfile.name);
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
    this.counselorDialog.open(CousnelorUpdateComponent, {
      data : this.counselorDetails
    });

    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;

    // dialogConfig.data = {
    //   data : this.counselorDetails
    // };

    // // this.counselorDialog.open(CousnelorUpdateComponent, dialogConfig);
    
    // const dialogRef = this.counselorDialog.open(CousnelorUpdateComponent, dialogConfig);


    // dialogRef.afterClosed()
    // .toPromise
    // .then(result => {
    //   console.log('From Promise:', result);
    // });

    // dialogRef.afterClosed().subscribe(
    //   data => console.log("closed")
    // );

    // dialogRef.afterClosed().subscribe(
    //     data => console.log("Dialog output:")
    // );    

    
  }

  

}
