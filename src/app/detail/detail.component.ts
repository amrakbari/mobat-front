import { Component } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {DetailService} from "../detail.service";
import {StoreInterface} from "../store-interface";
import {AddressInterface} from "../address-interface";
import {AppointmentInterface} from "../appointment-interface";
import {AppointmentInInterface} from "../appointment-in-interface";
import { DatePipe } from '@angular/common';
import {ServiceInterface} from "../service-interface";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

  userMap: Map<any, string> = new Map();
  serviceMap: Map<any, string> = new Map();
  selectedAppointment: any;
  appointments: AppointmentInterface[] = [];
  services: ServiceInterface[] = []



  isAdmin: boolean = false;
  selectedDate: string = "";

  address: AddressInterface = {
    id: 0,
    title: "",
    description: "",
  };

  compareStartDatetime(a: AppointmentInterface, b: AppointmentInterface): number {
    const dateA = new Date(a.start_datetime);
    const dateB = new Date(b.start_datetime);
    return dateA.getTime() - dateB.getTime();
  }

  setStore() {
    this.http.getStoreById(this.id).subscribe(store => {
      this.store = store;
      this.setAddress();
      this.getIfUserIsAdmin();
      this.getServices();
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in'])
      }
    })
  }

  getUserFromProfile(userId: any, appointmentId: any) {
    this.http.getUserFromProfile(userId).subscribe(user => {
      this.userMap.set(appointmentId, user.email);
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  getServiceFromId(serviceId: any, appointmentId: any) {
    this.http.getServiceById(serviceId).subscribe(service => {
      this.serviceMap.set(appointmentId, service.title);
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  getAppointmentForUserSubmit(form: any) {
    this.http.getAppointmentForUser(form.value.service, this.selectedAppointment.id).subscribe(appointment => {
      this.setAppointment(this.selectedDate)
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

  setSelectedAppointment(appointemnt: any) {
    this.selectedAppointment = appointemnt;
  }


  setAppointment(dateString: string) {
    this.http.getAppointmentsByDate(dateString, this.store.id).subscribe(appointments => {
      this.appointments = appointments;
      this.appointments.sort(this.compareStartDatetime);
      appointments.forEach((appointment: any) => {
        if (appointment.user !== undefined) {
          this.getUserFromProfile(appointment.user, appointment.id);
        }
        if (appointment.service !== undefined) {
          this.getServiceFromId(appointment.service, appointment.id);
        }
      })

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

  getServices() {
    this.http.getServices(this.store.id).subscribe(services => {
      this.services = services;
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['/sign-in']);
      }
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

}
