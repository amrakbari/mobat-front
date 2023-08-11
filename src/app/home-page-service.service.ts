import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {enviroment} from "../../environments/environments";

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
}
