import { Component } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {DetailService} from "../detail.service";
import {StoreInterface} from "../store-interface";
import {AddressInterface} from "../address-interface";
import {AppointmentInterface} from "../appointment-interface";
import {AppointmentInInterface} from "../appointment-in-interface";

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

  appointments: AppointmentInterface[] = [];

  isAdmin: boolean = false;

  address: AddressInterface = {
    id: 0,
    title: "",
    description: "",
  };
  setStore() {
    this.http.getStoreById(this.id).subscribe(store => {
      this.store = store;
      this.setAddress();
      this.getIfUserIsAdmin();
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

  getAppointments(appointmentDateForm: any) {
    let dateString = appointmentDateForm.value.date;
    this.setAppointment(dateString);

  }

  setAppointment(dateString: string) {
    this.http.getAppointmentsByDate(dateString).subscribe(appointments => {
      this.appointments = appointments;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  getIfUserIsAdmin() {
    this.http.getUser().subscribe(userData => {
      const userId = userData.id;
      const storeStylist = this.store.stylist;
      this.isAdmin = userId === storeStylist;
    })
  }

  appointmentSubmit(appointmentForm: any) {
    let day = appointmentForm.value.day
    let startTime = appointmentForm.value.start
    let endTime = appointmentForm.value.end
    let startTimeString = day + 'T' + startTime + ':00Z'
    let endTimeString = day + 'T' + endTime + ':00Z'
    let body: AppointmentInInterface = {
      store: this.store.id,
      start_datetime: startTimeString,
      end_datetime: endTimeString,
    }
    this.http.addAppointment(body).subscribe(data => {
      console.log(data);
      this.setAppointment(day);
    }, error => {
      console.log(error)
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
