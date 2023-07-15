import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpInterface} from "./sign-up-interface";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  post_user_data(body: SignUpInterface):  Observable<any> {
    return this.http.post('http://127.0.0.1:8001/auth/users/', body)
  }
}
