import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { jwtDeocde } from '../shared/jwt-decode';
import { GetSeeker } from '../ResponseClasses/getSeeker';
import { MatDialog } from '@angular/material';
import { CousnelorUpdateComponent } from '../cousnelor-update/cousnelor-update.component';
import { GetAppointedSeeker } from '../ResponseClasses/getAppointedSeeker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrls: ['./seeker-profile.component.css']
})
export class SeekerProfileComponent implements OnInit {

  profile:boolean = false;
  personalDetails:boolean = true;
  bookingsDetails:boolean = false;
  edit:boolean = false;
  date:Date;
  step:number = 0;
  public name:string;
  seekerDetails:GetSeeker;
  contactDetails : boolean = false;
  appointmentType : any;
  counselorDetails : GetAppointedSeeker;
  counselorFetch : boolean;

  constructor(private _api:ApiService, private counselorDialog : MatDialog, private _route: Router) { }

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
      this._api.deleteUser(this.seekerDetails.data.id)
      .subscribe(
        data => {
          
          localStorage.clear();
          this._route.navigate([{ outlets: { mainOutlet: null } }]);
          
         },
        error => console.log(error)
      )
    }
  }

  getDimension(event) {
    console.log("dimension : " + event.path[0].width);
    event.path[0].height = event.path[0].width;
  }

  saveCounselorData(counselor) {
    this.seekerDetails = counselor;
    console.log(this.seekerDetails.data);
    this.profile = true;

  }
  
  details(specifics) {
    if( specifics == "personal") {
      this.personalDetails = true;
      this.bookingsDetails = false;
    }
    else {
      this.personalDetails = false;
      this.bookingsDetails = true;
    }
    //console.log("personal : " + this.personalDetails + "\nbookings : " + this.bookingsDetails + "\nedit : " + this.edit);
  }

  dialogOpen() {
    console.log("openning diaog");
    this.counselorDialog.open(CousnelorUpdateComponent, {
      data : this.seekerDetails
    });
  }


  appointmentDetails( seekerId, availabilityId) {
   

    this._api.getBookedCounselor(availabilityId)
    .subscribe(
      data => this.saveSeekerDetails(data),
      error => console.log(error)
    );

  }

  saveSeekerDetails( data ) {
    this.contactDetails = data;
    console.log(this.contactDetails);
    this.counselorFetch = true;
  }

}
