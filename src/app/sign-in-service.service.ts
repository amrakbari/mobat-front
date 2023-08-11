import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInInterface} from "./sign-in-interface";
import {Observable} from "rxjs";
import {data} from "autoprefixer";
import {enviroment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class SignInServiceService {

  constructor(private http: HttpClient) { }

    logout() {;
      localStorage.removeItem("access_token");
    }

    login(body: SignInInterface): Observable<any> {
    return this.http.post(`${enviroment.apiurl}/auth/jwt/create/`, body);
  }
}
