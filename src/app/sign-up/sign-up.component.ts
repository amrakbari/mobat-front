import { Component } from '@angular/core';
import {SignUpService} from "../sign-up.service";
import {SignUpInterface} from "../sign-up-interface";
import {data} from "autoprefixer";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    constructor(private http: SignUpService) {}
    userRoles = [•••••••••••
      {id: 'ST', name: 'خدمات دهنده'},
      {id: 'US', name: 'کاربر معمولی'},
    ];
    submit(signUpForm: any) {
      let body: SignUpInterface = {
        "email": signUpForm.value.email,
        "password": signUpForm.value.password,
        "first_name": signUpForm.value.firstName,
        "last_name": signUpForm.value.lastName,
        "role": signUpForm.value.role,
        "birth_date": signUpForm.value.birthDate,
        "re_password": signUpForm.value.rePassword,
      }
      let response = this.http.post_user_data(body)
      console.log(body)
      response.subscribe(value => {console.log('ok')}, error => {console.log(error)})
    }
}
