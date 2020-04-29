import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//website pages
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CounselorProfileComponent } from './counselor-profile/counselor-profile.component';
import { SeekerProfileComponent } from './seeker-profile/seeker-profile.component';
import { RegisterComponent } from './register/register.component';
import { CounselorsComponent } from './counselors/counselors.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { CounselorBookingComponent } from './counselor-booking/counselor-booking.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule, MatList } from "@angular/material/list";
import { CounselorPersonalDetailsComponent } from './counselor-personal-details/counselor-personal-details.component';


//angular material
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";


//interceptor
import { MyInterceptor } from './shared/interceptor';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    CounselorProfileComponent,
    SeekerProfileComponent,
    RegisterComponent,
    CounselorsComponent,
    AboutUsComponent,
    FaqComponent,
    CounselorBookingComponent,
    CounselorPersonalDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule
    
  ],
  entryComponents: [
    CounselorBookingComponent
  ],
  providers: [
    DatePipe,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    MatDatepickerModule,
    MatRippleModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
