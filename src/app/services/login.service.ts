import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }
  login(value:any){
    return this._http.post(environment.apiUrl +"Login/Login",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
}
