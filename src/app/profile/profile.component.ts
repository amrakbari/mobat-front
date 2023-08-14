import {Component, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import {ProfileService} from "../profile.service";
import {UserDataInterface} from "../user-data-interface";
import {data} from "autoprefixer";
import {AddressInterface} from "../address-interface";
import {ServiceInterface} from "../service-interface";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {StoreInterface} from "../store-interface";
import {SignUpInterface} from "../sign-up-interface";
import {AddressInInterface} from "../address-in-interface";
import {NeighbourhoodInterface} from "../neighbourhood-interface";
import {StoreInInterface} from "../store-in-interface";
import {AppointmentInInterface} from "../appointment-in-interface";
import {ServiceStoreInterface} from "../service-store-interface";

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
  selectedStore: any;
  userAddresses: AddressInterface[] = []
  services: ServiceInterface[] = []
  stores: StoreInterface[] = []
  neighbourhoods: NeighbourhoodInterface[] = []

  getAddressById(id: number): AddressInterface | undefined {
    return this.userAddresses.find(o => o.id === id);
  }



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

  setStores() {
    this.http.getCurrentUserStores().subscribe(stores => {
      this.stores = stores;
    }, error => {
      if (error.status == '401') {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  setNeighbourhoods() {
    this.http.getNeighbourhoods().subscribe(neighbourhoods => {
      this.neighbourhoods = neighbourhoods;
    }, error => {
      if (error.status == '401') {
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

  setServices() {
    this.http.getServices().subscribe(services => {
      this.services = services;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  storeSubmit(addressForm: any) {
    let body: StoreInInterface = {
      title: addressForm.value.title,
      address: addressForm.value.address,
    }
    this.http.addStore(body).subscribe(address => {
      this.stores.push(address)
    })
  }

  constructor(private router: Router, private http: ProfileService) {
    this.setUserData();
    this.setUserAddresses();
    this.setServices();
    this.setStores();
    this.setNeighbourhoods();
  }

  addressSubmit(addressForm: any) {
    let body: AddressInInterface = {
      title: addressForm.value.title,
      neighbourhood: addressForm.value.neighbourhood,
      description: addressForm.value.description,
    }
    this.http.addAddress(body).subscribe(address => {
      this.userAddresses.push(address)
    })
  }

  addServiceToStore(serviceStoreForm: any) {
    let body: ServiceStoreInterface = {
      store: this.selectedStore.id,
      service: serviceStoreForm.value.service,
    }
    this.http.addServiceToStore(body).subscribe(service => {
      // add service
    })
  }

  appointmentSubmit(appointmentForm: any) {
    let day = appointmentForm.value.day
    let startTime = appointmentForm.value.start
    let endTime = appointmentForm.value.end
    let startTimeString = day + 'T' + startTime + ':00Z'
    let endTimeString = day + 'T' + endTime + ':00Z'
    let body: AppointmentInInterface = {
      store: this.selectedStore.id,
      start_datetime: startTimeString,
      end_datetime: endTimeString,
    }
    this.http.addAppointment(body).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error)
    })
  }

  setSelectedStore(store: any) {
    console.log(store.id)
    this.selectedStore = store;
  }

  redirect_to_home() {
    this.router.navigate(['']);
  }
}
