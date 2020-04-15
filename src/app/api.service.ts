import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './ResponseClasses/loginResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpclient: HttpClient) { }

  login(data): Observable <LoginResponse> {
    return this.httpclient.post <LoginResponse>(environment.loginapi, data);
  }
}
