import { SignUpComponent } from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'store/:id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
