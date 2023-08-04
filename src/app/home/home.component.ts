import { Component } from '@angular/core';
import {HomePageServiceService} from "../home-page-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stores = [];
  services = [];

  constructor(private http: HomePageServiceService, private router: Router) {

    this.http.get_stores().subscribe(data => {
      this.stores = data;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in'])
      }
    })

    this.http.get_services().subscribe(data => {
      this.services = data;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in'])
      }
    })
  }

}
