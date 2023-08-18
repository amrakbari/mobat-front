import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDataInterface} from "./user-data-interface";
import {enviroment} from "../../environments/environments";
import {AppointmentInInterface} from "./appointment-in-interface";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

  getServiceById(id: any): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/store/services/${id}/`, {headers: {'Authorization': `JWT ${token}`}})
  }

  getStoreById(id: string): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/${id}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getAddressById(id: number): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/accounts/addresses/${id}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getAppointmentsByDate(date: string, storeId: any): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/${storeId}/appointments/?date=${date}`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getServices(storeId: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/${storeId}/services/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getUserFromProfile(profileId: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/profiles/${profileId}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getUser(): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/auth/users/me/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  addAppointment(body: AppointmentInInterface): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${enviroment.apiurl}/store/appointments/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

  deleteAppointment(id: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.delete(`${enviroment.apiurl}/store/appointments/${id}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getAppointmentForUser(service_id: any, appointment_id: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    let body = {
      service: parseInt(service_id),
      id: appointment_id,
    };
    return this.http.post(`${enviroment.apiurl}/store/stores/set-appointment-for-user/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

}
