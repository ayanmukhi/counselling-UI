import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CounselorProfileComponent } from './counselor-profile/counselor-profile.component';
import { SeekerProfileComponent } from './seeker-profile/seeker-profile.component';
import { RegisterComponent } from './register/register.component';
import { CounselorsComponent } from './counselors/counselors.component';
import { FaqComponent } from './faq/faq.component';
import { MediaComponent } from './media/media.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'', component: HomeComponent, outlet: "mainOutlet"},
  {path:'login', component: LoginComponent, outlet: "mainOutlet"},
  {path:'counselor-profile/:time', component: CounselorProfileComponent, outlet: "mainOutlet", pathMatch: 'full', canActivate: [AuthGuard]},
  {path:'seeker-profile/:time', component: SeekerProfileComponent, outlet: "mainOutlet", pathMatch: 'full', canActivate: [AuthGuard]},
  {path:'register',component: RegisterComponent, outlet: "mainOutlet"},
  {path:'motivate', component: MediaComponent, outlet: "mainOutlet"},
  {path:'counselors', component: CounselorsComponent, outlet: "mainOutlet"},
  {path:'faq', component: FaqComponent, outlet: "mainOutlet"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
