import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private _http:HttpClient) { }
  orderCount(type:any){
    return this._http.post(environment.apiUrl +"Dashboard/OrderCount",type, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  sublclientOrderByMonth(type:any){
    return this._http.post(environment.apiUrl +"Dashboard/SubClientMonthWiseCount",type, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
 
  subClientList(client:any){
    return this._http.post(environment.apiUrl +"Dashboard/SubClientFilter?ClientID="+client, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  subClientGraph(date:any){
    return this._http.post(environment.apiUrl +"Dashboard/SubClientGraph",date, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  stateGraph(date:any){
    return this._http.post(environment.apiUrl +"Dashboard/StateGraph",date, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
 portalGraph(date:any){
    return this._http.post(environment.apiUrl +"Dashboard/PortalGraph",date, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  dueOrderGraph(date:any){
    return this._http.post(environment.apiUrl +"Dashboard/DueOrderCountChart",date, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  stateList(client:any){
    return this._http.post(environment.apiUrl +"OrderList/StateList?ClientID="+client, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  portalList(client:any){
    return this._http.post(environment.apiUrl +"OrderList/PortalList?ClientID="+client, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

 picStatusList(){
    return this._http.get(environment.apiUrl +"OrderList/GetPictureStatus", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  orderTypeList(){
    return this._http.get(environment.apiUrl +"OrderList/OrderTypeList", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
 zipCodeOrderCount(value:any){
  return this._http.post(environment.apiUrl +"Dashboard/ZipcodeGraph",value, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  })
 }

portalOrderCount(value:any){
  return this._http.post(environment.apiUrl +"Dashboard/PortalGraph",value, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  })
 }

stateOrderCount(value:any){
  return this._http.post(environment.apiUrl +"Dashboard/StateGraph",value, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  })
 }

}
