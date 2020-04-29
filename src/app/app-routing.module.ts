import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CounselorProfileComponent } from './counselor-profile/counselor-profile.component';
import { SeekerProfileComponent } from './seeker-profile/seeker-profile.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CounselorsComponent } from './counselors/counselors.component';
import { FaqComponent } from './faq/faq.component';
import { CounselorPersonalDetailsComponent } from './counselor-personal-details/counselor-personal-details.component';


const routes: Routes = [
  {path:'', component: HomeComponent, outlet: "mainOutlet"},
  {path:'login', component: LoginComponent, outlet: "mainOutlet"},
  {path:'counselor-profile', component: CounselorProfileComponent, outlet: "mainOutlet"},
  {path:'seeker-profile', component: SeekerProfileComponent, outlet: "mainOutlet"},
  {path:'register',component: RegisterComponent, outlet: "mainOutlet"},
  {path:'about-us', component: AboutUsComponent, outlet: "mainOutlet"},
  {path:'counselors', component: CounselorsComponent, outlet: "mainOutlet"},
  {path:'faq', component: FaqComponent, outlet: "mainOutlet"},
  {path:'', component: CounselorPersonalDetailsComponent, outlet: "counselorProfile"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
