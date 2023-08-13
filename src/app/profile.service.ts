import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../environments/environments";
import {Observable} from "rxjs";
import {UserDataInterface} from "./user-data-interface";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AddressInInterface} from "./address-in-interface";
import {StoreInInterface} from "./store-in-interface";
import {AppointmentInInterface} from "./appointment-in-interface";
import {ServiceStoreInterface} from "./service-store-interface";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/profiles/get_current_user_profile/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getUser(): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/auth/users/me/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getUserAddresses(): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/accounts/addresses/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  addAddress(body: AddressInInterface): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${enviroment.apiurl}/accounts/addresses/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

  addAppointment(body: AppointmentInInterface): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${enviroment.apiurl}/store/appointments/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

  addStore(body: StoreInInterface): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${enviroment.apiurl}/store/stores/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

  addServiceToStore(body: ServiceStoreInterface): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${enviroment.apiurl}/store/stores/add-service-to-store/`, body, {headers: {'Authorization': `JWT ${token}`}});
  }

  getServices(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/store/services/`, {headers: {'Authorization': `JWT ${token}`}})
  }

  getCurrentUserStores(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/store/stores/current-user-stores/`, {headers: {'Authorization': `JWT ${token}`}})
  }

  getNeighbourhoods(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/accounts/neighbourhoods/`, {headers: {'Authorization': `JWT ${token}`}})
  }

}
