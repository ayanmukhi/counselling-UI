import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { emailValidator, passwordNumberValidator, passwordLowerCaseValidator, passwordSpecialValidator, passwordUpperCaseValidator } from '../shared/form-validators';
import { ApiService } from "../api.service";
import { LoginResponse } from "../ResponseClasses/loginResponse";
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public credentialsMatch = "";
  userData : LoginResponse;
  token : string;
  uppercase:boolean;
  lowercase:boolean;
  number:boolean;

  constructor( private fb: FormBuilder, private _apiservice: ApiService, private _route: Router) { }
  


  get getUsername() {
    return this.loginForm.get('username');
  }
  get getPassword() {
    return this.loginForm.get('password');
  }
  
  loginForm = this.fb.group({
    username: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(4), passwordNumberValidator, passwordLowerCaseValidator, passwordSpecialValidator, passwordUpperCaseValidator]]
  });


  onSubmit(){ 
    this._apiservice.login(this.loginForm.value)
    .subscribe(
      data => this.saveData(data),
      error => this.errorData(error)
    );
  }


  errorData(error){
    this.credentialsMatch = "credentials dosen't match each other";
  }


  //save token to local storage
  saveData(data) {
    this.userData = data;
    localStorage.setItem('jwt', this.userData.token);
    localStorage.setItem('image', this.userData.data);
    this._route.navigate([{ outlets: { mainOutlet: [''] } }]);
  }

  ngOnInit() {
  }

  register() {
    this._route.navigate([{ outlets: { mainOutlet: ['register'] } }]);
  }

}
