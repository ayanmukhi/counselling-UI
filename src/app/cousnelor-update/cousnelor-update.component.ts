import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { nameValidator, emailValidator, phoneValidator, pinValidator } from '../shared/form-validators';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { jwtDeocde } from '../shared/jwt-decode';


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
  imageRef : string;
  imageSrc : string;
  imageChange : boolean = false;
  uploadForm = new FormData();


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
    console.log(this.counselor.data);
    
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
      phone : [this.phone, [Validators.required, phoneValidator]],
       
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
    formData.image = this.imageSrc;
    formData.id = this.counselor.data.id;
    formData.role =  this.counselor.data.role;
    formData.password = this.counselor.data.password;
    console.log(formData);
    
    //uploading image to file system
    if( this.imageChange ) {
      this._apiService.updateUser(formData)
      .subscribe(
        data => {
          this._apiService.postUploadFile(this.uploadForm).subscribe(
            event => {
              if ( event.type === HttpEventType.UploadProgress ) {
                console.log( " FILE UPLOADEDING : " );
              }
              if( event instanceof HttpResponse ) {
                console.log( "RESPONSE AFTER");
              }
            }
          )
          console.log(data);
          this.navigateUser()
        },
        error => console.log(error)
      );
    }
    else {
      this._apiService.updateUser(formData)
      .subscribe(
        data => {
          console.log(data);
          this.navigateUser();
        },
        error => console.log(error)
      );
    }
    
  }


  getFIle() {
    document.getElementById("uploadPic").click();
    
    this.imageChange = true;
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


  
  processFile(imageInput: any, event) {

    var position;
    let image : File;
    let imageSrc : string;
    const file: File = imageInput.files[0];
    let title : string = this.counselor.data.username; 



    //upload the file to data server
    if( event.target.files.length >= 1 ) {
      image = event.target.files[0];
    }
    

    this.uploadForm.append('myFile', image, image.name);
    this.uploadForm.append('fileTitle', title);
    this.uploadForm.append('fileExt', image.type);

    


    //convert image to base64 url
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      
      imageSrc = this.selectedFile.src;
      for( let i = 0 ; i < imageSrc.length ; i++ ) {
        if(imageSrc[i] == ',') {
          position = i + 1;
          break;
        }
      }
      this.imageSrc = imageSrc.slice(position);
      //console.log(this.image);

      this.selectedFile.pending = true;
      this.onSuccess(); 
    });


    //sda
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.image = reader.result;
    }
  }


  closeDialog() {
    this.counserlorDialogRef.close("hey");
  }

}
