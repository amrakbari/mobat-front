import { Component } from '@angular/core';
import {HomePageServiceService} from "../home-page-service.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HomePageServiceService) {
    let stores = [];
    this.http.get_stores().subscribe(data => {
      stores = data;
    }, error => {
      console.log(error);
      // change
    })
  }

}
