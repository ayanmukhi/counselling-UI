import { Component, OnInit } from '@angular/core';
import { jwtDeocde } from '../shared/jwt-decode';
import { ApiService } from '../api.service';
import { GetCounselor } from '../ResponseClasses/getCounselor';

@Component({
  selector: 'app-counselor-profile',
  templateUrl: './counselor-profile.component.html',
  styleUrls: ['./counselor-profile.component.css']
})
export class CounselorProfileComponent implements OnInit {

  profile:boolean;
  personalDetails:boolean = true;
  bookingsDetails:boolean = false;
  edit:boolean = false;
  date:Date;
  step:number = 0;
  public name:string;
  counselorDetails:GetCounselor;
  constructor(private _api:ApiService) { }

  ngOnInit() {
    let token = JSON.parse(jwtDeocde(localStorage.getItem("jwt")));
    this._api.getUser(token.id)
    .subscribe(
      data => this.saveCounselorData(data),
      error => console.log(error)
    );
  }

  getDimension(event) {
    console.log("dimension : " + event.path[0].width);
    event.path[0].height = event.path[0].width;
  }

  saveCounselorData(counselor) {
    this.counselorDetails = counselor.data;
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



}
