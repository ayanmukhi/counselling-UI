import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { nameValidator, emailValidator, phoneValidator, pinValidator } from '../shared/form-validators';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


interface ModalData {
  data : {
    availability : [
      {
        Id : string,
        Status : string,
        Time : string,
        Day : string[],
      }
    ],
    bookings : [
      {
        SeekerId : string,
        Date : Date,
        AvailabilityId : string
      }
    ],
    contact : {
      state : string,
      streetName : string,
      district : string,
      pin : string,
      phone : string
    },
    dob : Date,
    gender : string,
    id : string,
    image : string,
    name : string,
    password : string,
    role : string,
    username : string
  }
}

class  ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}




@Component({
  selector: 'app-cousnelor-update',
  templateUrl: './cousnelor-update.component.html',
  styleUrls: ['./cousnelor-update.component.css']
})

export class CousnelorUpdateComponent implements OnInit {

  streetName : string;
  state : string;
  pin : string;
  phone : string;
  district : string;
  image : any;
  currentYear = new Date().getFullYear();
  maxDate:Date;
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  selectedFile : ImageSnippet;
  updateForm : any;

  constructor( public counserlorDialogRef : MatDialogRef<CousnelorUpdateComponent>,
                @Inject(MAT_DIALOG_DATA) public counselor : ModalData,
                @Inject(MAT_DIALOG_DATA) public id : number,
                private _fb : FormBuilder,
                private _datePipe : DatePipe,
                private _apiService : ApiService,
                private _route : Router ) { 
                  this.maxDate = new Date(this.currentYear - 20,0,1)
                }

  ngOnInit() {

    console.log("-----------------------------");
    console.log(this.counselor.data.id);
    // console.log("dialog" + this.counselor.data.contact.district);
    this.image = this.counselor.data.image;

    if( this.counselor.data.contact == null) {
      this.district = '';
      this.streetName = '';
      this.state = '';
      this.pin = '';
      this.phone = '';
    }
    else {
      this.district = this.counselor.data.contact.district;
      this.streetName = this.counselor.data.contact.streetName;
      this.state = this.counselor.data.contact.state;
      this.pin = this.counselor.data.contact.pin;
      this.phone = this.counselor.data.contact.phone;
    }
    
    this.updateForm = this._fb.group ({
      name : [this.counselor.data.name, [Validators.required, nameValidator]],
      dob : [this.counselor.data.dob, [Validators.required]],
      username : [this.counselor.data.username, [Validators.required, emailValidator]],
      gender : [this.counselor.data.gender, [Validators.required]],
      streetName : [this.streetName,[Validators.required]],
      state : [this.state, [Validators.required, nameValidator]],
      district : [this.district, [Validators.required]],
      pin : [this.pin, [Validators.required, pinValidator]],
      phone : [this.phone, [Validators.required, phoneValidator]]
    });
  }

  get getDate() {
    return this.updateForm.get('dob');
  }

  get getGender() {
    return this.updateForm.get('gender');
  }

  get getEmail() {
    return this.updateForm.get('username');
  }
  
  get getName() {
    return this.updateForm.get('name');
  }

  get getStreetName() {
    return this.updateForm.get('streetName');
  }

  get getState() {
    return this.updateForm.get('state');
  }

  get getDistrict() {
    return this.updateForm.get('district');
  }

  get getPin() {
    return this.updateForm.get('pin');
  }
   
  get getPhone() {
    return this.updateForm.get('phone');
  }



  submit() {
    var formData = this.updateForm.value;
    formData.dob = this._datePipe.transform(formData.dob, 'yyyy-MM-dd');
    formData.image = this.image;
    formData.id = this.counselor.data.id;
    formData.role =  this.counselor.data.role;
    formData.password = this.counselor.data.password;
    console.log(formData);

    this._apiService.updateUser(formData)
    .subscribe(
      data => this.navigateUser(),
      error => console.log(error)
    );
  }

  //navigate user to their repective profile
  navigateUser() {

    var time = new Date().getTime();
    this.closeDialog();
    if( this.counselor.data.role == 'counselor') {
      this._route.navigate([{ outlets: {mainOutlet : ['counselor-profile', time]}}]);
    }
    else {
      this._route.navigate([{ outlets: {mainOutlet : ['seeker-profile', time]}}]);
    }
  }


  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }



  processFile(imageInput: any) {
    var position;
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      
      this.image = this.selectedFile.src;
      for( let i = 0 ; i < this.image.length ; i++ ) {
        if(this.image[i] == ',') {
          position = i + 1;
          break;
        }
      }
      this.image = this.image.slice(position);
      //console.log(this.image);

      this.selectedFile.pending = true;
      this.onSuccess(); 
    });


    //sda
    reader.readAsDataURL(file);
  }


  closeDialog() {
    this.counserlorDialogRef.close("hey");
  }

}
