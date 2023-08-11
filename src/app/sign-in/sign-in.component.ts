import {Component} from '@angular/core';
import {SignInInterface} from "../sign-in-interface";
import {SignInServiceService} from "../sign-in-service.service";
import { Router } from "@angular/router";


import * as moment from "moment";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private http: SignInServiceService, private router: Router) {

  }

  private setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access);
  }

  submit(signInForm: any) {
    let body: SignInInterface = {
      email: signInForm.value.email,
      password: signInForm.value.password,
    }
    this.http.login(body).subscribe(data => {
      if (data && data.access) {
        this.setSession(data);
        this.router.navigate(['/'])
      }
    }, error => {
      console.log(error)
      // show alert
    });
  }
}
