import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {enviroment} from "../../environments/environments";
import {UserDataInterface} from "./user-data-interface";
import {AddressInInterface} from "./address-in-interface";

@Injectable({
  providedIn: 'root'
})
export class HomePageServiceService {

  constructor(private http: HttpClient) { }


  get_stores(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/store/stores/`, {headers: {'Authorization': `JWT ${token}`}})
  }

  get_services(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get(`${enviroment.apiurl}/store/services/`, {headers: {'Authorization': `JWT ${token}`}})
  }

  getStoresByServiceId(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/get-stores-by-service/${id}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getNearbyStores(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/store/stores/get-nearby-stores/${id}/`, {headers: {'Authorization': `JWT ${token}`}});
  }

  getUserAddresses(): Observable<any> {
    let finalData: UserDataInterface;
    const token = localStorage.getItem('access_token');
    return this.http.get(`${enviroment.apiurl}/accounts/addresses/`, {headers: {'Authorization': `JWT ${token}`}});
  }
}
