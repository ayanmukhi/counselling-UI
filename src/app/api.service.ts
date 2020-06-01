import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './ResponseClasses/loginResponse';
import { GetAllUsers } from "./ResponseClasses/getAllUsers";
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetCounselor } from './ResponseClasses/getCounselor';
import { InsertUser } from "./ResponseClasses/insertUserResponse";
import { GetAvailability } from './ResponseClasses/getAvailability';
import { GetAppointedSeeker } from './ResponseClasses/getAppointedSeeker';
import { UpdateInterface } from './ResponseClasses/userUpdateResponse';
import { GetSeeker } from './ResponseClasses/getSeeker';
import { map, catchError } from 'rxjs/operators';

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

  getAppointedUser(id) {
    return this.httpclient.get <GetAppointedSeeker>(environment.appointmentApi + "/" + id);
  }

  updateUser( data ) {
    return this.httpclient.put <UpdateInterface>(environment.userApi, data);
  }

  getBookedCounselor(id) {
    return this.httpclient.get <GetAppointedSeeker>(environment.bookingApi + '/' + id);
  }

  postUploadFile(data) {
    return this.httpclient.post <any>(environment.uploadFile, data, {
      reportProgress : true,
      observe : 'events'
    });
  }

  deleteUser(id) {
    return this.httpclient.delete <DeleteResponse>( environment.userApi + '/' + id);
  }

  getAllMedia() {
    return this.httpclient.get <AllMediaResponse>(environment.media);
  }

  makeAppoinment(data) {
    return this.httpclient.post <MakeAppointment>(environment.bookingApi, data);
  }

  newAailability( data ) {
    return this.httpclient.post <InsertAvailability>( environment.availabilityApi, data);
  }

  deleteAvailability( id ) {
    return this.httpclient.delete <DeleteAvailability>( environment.availabilityApi + "/" + id);
  }

  updateAvailability( data ) {
    return this.httpclient.put <InsertAvailability>( environment.availabilityApi, data);
  }
  
}
