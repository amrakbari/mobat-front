import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {ProfileService} from "../profile.service";
import {UserDataInterface} from "../user-data-interface";
import {data} from "autoprefixer";
import {AddressInterface} from "../address-interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData: UserDataInterface = {
    email: "",
    first_name: "",
    last_name: "",
    role: "",
  };

  userAddresses: AddressInterface[] = []


  setUserData() {
    this.http.getUserProfile().subscribe(data => {
      this.userData.role = data.role;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
    this.http.getUser().subscribe(data => {
      this.userData.email = data.email;
      this.userData.first_name = data.first_name;
      this.userData.last_name = data.last_name;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  setUserAddresses() {
    this.http.getUserAddresses().subscribe(addresses => {
      this.userAddresses = addresses;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  addAppointment() {
    this.http.addAddress().subscribe(data => {
      // add returned data to Adresses
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  constructor(private router: Router, private http: ProfileService) {
    this.setUserData()
    this.setUserAddresses()
  }

  redirect_to_home() {
    this.router.navigate(['']);
  }
}
