import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpRequest,HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";
  
  
  @Injectable(
   
  )
  export class MyInterceptor implements HttpInterceptor {
    
    constructor() {
     }

    
    rawtoken : string;
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const uploadURL = '/upload';
      this.rawtoken = localStorage.getItem('jwt');
      if( request.url.search(uploadURL) === -1) {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer '+ this.rawtoken,
            'Content-Type': 'application/json'
        });
        const cloneReq = request.clone({headers});
        console.log("interceptor jwt alert");
        return next.handle(cloneReq);
      }
      const headers = new HttpHeaders({
        'Authorization': 'Bearer '+ this.rawtoken,
      });
      const cloneReq = request.clone({headers});
      console.log("no jwt interceptor alert " + request.url.search(uploadURL));
      return next.handle(cloneReq);
    }

    
}