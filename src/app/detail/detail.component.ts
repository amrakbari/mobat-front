import { Component } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {DetailService} from "../detail.service";
import {StoreInterface} from "../store-interface";
import {AddressInterface} from "../address-interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id: any = '1';
  store: StoreInterface = {
    address: 0,
    stylist: 0,
    title: "",
    id: 0,
  };
  address: AddressInterface = {
    id: 0,
    title: "",
    description: "",
  };
  setStore() {
    this.http.getStoreById(this.id).subscribe(store => {
      this.store = store;
      this.setAddress();
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in'])
      }
    })
  }

  setAddress() {
    this.http.getAddressById(this.store.address).subscribe(address => {
      this.address = address;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private http: DetailService) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.setStore();
  }

  redirect_to_home() {
    this.router.navigate(['']);
  }

}
