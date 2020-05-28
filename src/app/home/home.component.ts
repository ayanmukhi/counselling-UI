import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { SrvRecord } from 'dns';
import { CdkStepperNext } from '@angular/cdk/stepper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  imageSrc = new Array;
  index : number;
  len : number;
  currentImage : string;

  constructor() { }


  ngOnInit() {

    this.index = 1;
    this.imageSrc = [
      '../../assets/images/carasoul/Marriage.png',
      '../../assets/images/carasoul/Pharmacy.jpg',
      '../../assets/images/carasoul/Addiction.jpg',
      '../../assets/images/carasoul/counselling_therapy.png',
      '../../assets/images/carasoul/counselling_therapy.png'
    ];
    this.currentImage = this.imageSrc[ this.index ];
    setInterval( () => { this.next(); }, 3000);
    this.len = this.imageSrc.length;
    console.log(this.len);

  }

  next() {
    this.index =  (this.index  + 1) % this.len;
    this.currentImage = this.imageSrc[ this.index ];
  }

  previous() {
    if( this.index == 0 ) {
      this.index = 3;
    }
    else {
      this.index = Math.abs((this.index  - 1) % this.len);
    }
    this.currentImage = this.imageSrc[ this.index ];
  }

}
