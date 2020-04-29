import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './ResponseClasses/loginResponse';
import { GetAllUsers } from "./ResponseClasses/getAllUsers";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetCounselor } from './ResponseClasses/getCounselor';
import { InsertUser } from "./ResponseClasses/insertUserResponse";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpclient: HttpClient) { }

  login(data): Observable <LoginResponse> {
    return this.httpclient.post <LoginResponse>(environment.loginApi, data);
  }

  getallusers(): Observable <GetAllUsers> {
    return this.httpclient.get <GetAllUsers>(environment.getUsersApi); 
  }

  getUser(id) {
    return this.httpclient.get <GetCounselor>(environment.userApi + "/" + id);
  }

  insertUser(data) {
    return this.httpclient.post <InsertUser>(environment.userApi, data);
  }
}
