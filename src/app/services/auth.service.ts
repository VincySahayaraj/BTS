import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-in
  signIn(logindetails: any) {
    return this.http
      .post<any>(environment.apiUrl + "Login/Login",logindetails,{
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      })  
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }

  getClientName(){
    let clientName = localStorage.getItem('client_name');
    return clientName;
  }
  
  getClientID(){

    let clientID = localStorage.getItem('client_id');
    return clientID;
  }

  hasState(){
    let hasState = localStorage.getItem('has_state');
    return hasState;
  }

  hasSubClient(){
    let hasSubClient = localStorage.getItem('has_subclient');
    return hasSubClient;
  }



  // User profile
  // getUserProfile(id: any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res || {};
     
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
