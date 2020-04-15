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


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'counselor-profile', component: CounselorProfileComponent},
  {path:'seeker-profile', component: SeekerProfileComponent},
  {path:'register',component: RegisterComponent},
  {path:'about-us', component: AboutUsComponent},
  {path:'counselors', component: CounselorsComponent},
  {path:'faq', component: FaqComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
