import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomePageServiceService {

  constructor(private http: HttpClient) { }


  get_stores(): Observable<any> {
    const token = localStorage.getItem('access_token')
    return this.http.get('http://localhost:8000/store/stores/', {headers: {'Authorization': `JWT ${token}`}})
  }
}
