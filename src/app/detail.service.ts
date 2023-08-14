import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDataInterface} from "./user-data-interface";
import {enviroment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

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

  getAppointmentsByDate(date: string): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/1/appointments/?date=${date}`, {headers: {'Authorization': `JWT ${token}`}});
  }

}
