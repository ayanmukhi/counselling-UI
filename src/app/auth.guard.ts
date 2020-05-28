import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDeocde } from './shared/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  token: JSON;
  rawtoken:string;
  user:{
    'success':string,
    'data': {
      'status':string,
      'sic':number
    },
    'token':string
    
  };
  constructor(private _route: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if( localStorage.getItem('jwt')) {
        var token = localStorage.getItem('jwt');
        if( token != null) {
          return true;
        }
      }
      this._route.navigate([{ outlets: { mainOutlet: [] } }]);
      return false;
    }
  
}
