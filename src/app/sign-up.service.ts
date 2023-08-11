import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpInterface} from "./sign-up-interface";
import {enviroment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  private setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access);
  }
  post_user_data(body: SignUpInterface):  Observable<any> {
    return this.http.post(`${enviroment.apiurl}/auth/users/`, body)
  }
}
