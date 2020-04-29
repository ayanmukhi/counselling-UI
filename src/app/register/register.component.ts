import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { emailValidator, passwordSpecialValidator, passwordLowerCaseValidator, passwordNumberValidator, passwordUpperCaseValidator, nameValidator, dateValidator } from "../shared/form-validators";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


class ImageSnippet {
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

  errorMessage : string;
  currentYear = new Date().getFullYear();
  maxDate:Date;
  passwordsMatch : boolean = false;
  selectedFile:ImageSnippet;
  image:any = "";
  touch : boolean = false;
  confirmTouch : boolean = false;
  imageBase64 : string;
  roleOptions : any = [
                      {'role':'Seeker', 'info':'One who will take cousnelling sessions'},
                      {'role':'Counselor', 'info':'One who will give counseling sessions'}
                    ];
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  constructor( private _fb: FormBuilder, private datePipe: DatePipe , private _apiservice: ApiService, private _route: Router  ) {
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


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

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


  onSubmit(){ 
    var position;
    var formData = this.registrationForm.value; 

    formData.dob = this.datePipe.transform(formData.dob , 'yyyy-MM-dd');
    console.log(formData.dob);
    for( let i = 0 ; i < this.image.length ; i++ ) {
      if(this.image[i] == ',') {
        position = i + 1;
        break;
      }
    }
    formData.image = this.image.slice(position);
    //console.log(this.image.slice(position));
    this._apiservice.insertUser(formData)
    .subscribe(
      data => {
        console.log(data);
        this._route.navigate([{ outlets: { mainOutlet: ['login'] } }]);
      },
      error => {
        this.errorMessage = error.error.message;
        console.log(error)
      }
    );
  }


}
