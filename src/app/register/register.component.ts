import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { emailValidator, passwordSpecialValidator, passwordLowerCaseValidator, passwordNumberValidator, passwordUpperCaseValidator, nameValidator, dateValidator } from "../shared/form-validators";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpResponse, HttpEventType } from '@angular/common/http';


class  ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  passwordVisibility : boolean = true;
  errorMessage : string;
  currentYear = new Date().getFullYear();
  maxDate:Date;
  passwordsMatch : boolean = false;
  selectedFile:ImageSnippet;
  image:any = "";
  touch : boolean = false;
  confirmTouch : boolean = false;
  imageBase64 : string;
  uploadImage : File;
  imageRef : string;
  roleOptions : any = [
                      {'role':'Seeker', 'info':'One who will take cousnelling sessions'},
                      {'role':'Counselor', 'info':'One who will give counseling sessions'}
                    ];
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  constructor( 
    private _fb: FormBuilder,
    private datePipe: DatePipe, 
    private _apiservice: ApiService, 
    private _route: Router 
    ) {
      this.maxDate = new Date(this.currentYear - 20, 0, 1);
    }

  registrationForm = this._fb.group({
    username : ['', [Validators.required, emailValidator]],
    name : ['', [Validators.required, nameValidator]],
    password : ['', [Validators.required, passwordLowerCaseValidator, passwordNumberValidator, passwordSpecialValidator, passwordUpperCaseValidator]],
    dob : ['', [Validators.required]],
    gender : ['', [Validators.required]],
    role : ['', [Validators.required, dateValidator]],
  });

 touched() {
    this.touch = true;
  }

  confirmTouched() {
    this.confirmTouch = true;
  }



  ngOnInit() {
  }
  
  get getDate() {
    return this.registrationForm.get('dob');
  }

  get getRole() {
    return this.registrationForm.get('role');
  }

  get getGender() {
    return this.registrationForm.get('gender');
  }

  get getEmail() {
    return this.registrationForm.get('username');
  }

  get getFullName() {
    return this.registrationForm.get('name');
  }

  get getPassword() {
    return this.registrationForm.get('password');
  }


  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }


  processFile(imageInput: any, event) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    //upload the file to data server
    if( event.target.files.length >= 1 ) {
      this.uploadImage = event.target.files[0];
    }


    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      
      this.image = this.selectedFile.src;

      // console.log(this.image);

      this.selectedFile.pending = true;
      this.onSuccess(); 
    });


    //sda
    reader.readAsDataURL(file);
  }

  toggleVisibility( password ) {
    console.log(password.type);
    if( password.type == "password") {
      password.type = "text";
      this.passwordVisibility = false;
    }
    else {
      password.type = "password";
      this.passwordVisibility = true;
    }
  }

  getFIle() {
    document.getElementById("uploadBtn").click();
  }


  onSubmit() { 

    var position;
    var formData = this.registrationForm.value; 

    // console.log(formData);
    formData.dob = this.datePipe.transform(formData.dob , 'yyyy-MM-dd');

    //console.log(formData.dob);
    for( let i = 0 ; i < this.image.length ; i++ ) {
      if(this.image[i] == ',') {
        position = i + 1;
        break;
      }
    }
    formData.image = this.image.slice(position);
    console.log(formData);
    this._apiservice.insertUser(formData)
    .subscribe(
      data => {
        console.log(data);
        //uploading image to data server
        const uploadFile = new FormData();

        uploadFile.append('myFile', this.uploadImage, this.uploadImage.name);
        uploadFile.append('fileTitle', this.registrationForm.get('username').value);
        uploadFile.append('fileExt', this.uploadImage.type);

        this._apiservice.postUploadFile(uploadFile)
        .subscribe(
          event => {
            if ( event.type === HttpEventType.UploadProgress ) {
              console.log( " FILE UPLOADEDING : " );
            }
            if( event instanceof HttpResponse ) {
              console.log( "RESPONSE AFTER");
              this.uploadImage = null;
            }
          }
        );
        this._route.navigate([{ outlets: { mainOutlet: ['login'] } }]);
      },
      error => {
        this.errorMessage = error.error.message;
        console.log(error)
      }
    );
  }

  closeDialog() {
    this._route.navigate([{ outlets: { mainOutlet: ['login'] } }]);
  }


}
