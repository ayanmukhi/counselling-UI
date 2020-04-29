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
            this.rawtoken = localStorage.getItem('jwt');
            const headers = new HttpHeaders({
                'Authorization': 'Bearer '+ this.rawtoken,
                'Content-Type': 'application/json'
            });
            const cloneReq = request.clone({headers});
            console.log("interceptor alert");
            return next.handle(cloneReq);
    }

    
}