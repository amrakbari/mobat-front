import { Component } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {DetailService} from "../detail.service";
import {StoreInterface} from "../store-interface";
import {AddressInterface} from "../address-interface";
import {AppointmentInterface} from "../appointment-interface";
import {AppointmentInInterface} from "../appointment-in-interface";
import { DatePipe } from '@angular/common';

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
  selectedDate: string = "";

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

  getAppointments() {
    this.setAppointment(this.selectedDate);
  }


  setAppointment(dateString: string) {
    console.log(dateString)
    this.http.getAppointmentsByDate(dateString, this.store.id).subscribe(appointments => {
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

  appointmentBulkSubmit() {
    let day = this.selectedDate;

    // Define the start and end times for the loop
    let startTime = 8; // 8 AM
    let endTime = 20; // 8 PM

    // Loop through the time intervals
    for (let i = startTime; i < endTime; i += 2) {
      let startHour = i.toString().padStart(2, '0'); // Add leading zero if needed
      let endHour = (i + 2).toString().padStart(2, '0'); // Add leading zero if needed

      let startTimeString = day + 'T' + startHour + ':01:00Z';
      let endTimeString = day + 'T' + endHour + ':00:00Z';

      let body: AppointmentInInterface = {
        store: this.store.id,
        start_datetime: startTimeString,
        end_datetime: endTimeString,
      };

      this.http.addAppointment(body).subscribe(
        data => {
          console.log(data);
          this.setAppointment(day);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private http: DetailService, private datePipe: DatePipe) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.setStore();
  }

  redirect_to_home() {
    this.router.navigate(['']);
  }

  convertToPersianDigits(timeString: string) {
    const westernDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    for (let i = 0; i < 10; i++) {
      timeString = timeString.replace(new RegExp(westernDigits[i], 'g'), persianDigits[i]);
    }

    return timeString;
  }

}
