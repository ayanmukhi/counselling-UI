import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit() {
  }

  checkUserLoggedIn() {
    if( localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this._route.navigate(['']);
  }

}
