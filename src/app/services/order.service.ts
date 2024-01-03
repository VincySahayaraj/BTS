import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }
  orderDetails(type:any){
    return this._http.post(environment.apiUrl +"OrderList/OrderDetailsByStatus",type, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  statechartGraph(count:any){
    return this._http.post(environment.apiUrl +"OrderList/StateGraphByStatus",count, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  portalchartGraph(count:any){
    return this._http.post(environment.apiUrl +"OrderList/PortalGraphByStatus",count, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
  zipcodechartGraph(count:any){
    return this._http.post(environment.apiUrl +"OrderList/ZipCodeGraphByStatus",count, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  //state wise orders
  statewiseOrders(value:any){
    return this._http.post(environment.apiUrl +"OrderList/StateWiseOrders",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
   //state wise orders
   zipcodewiseOrders(value:any){
    return this._http.post(environment.apiUrl +"OrderList/ZipCodeWiseOrders",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
   //state wise orders
   portalwiseOrders(value:any){
    return this._http.post(environment.apiUrl +"OrderList/PortalWiseOrders",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  subclientDetails(value:any){
    return this._http.post(environment.apiUrl +"Dashboard/SubClientOrderCount",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  inProgressDetails(value:any){
    return this._http.post(environment.apiUrl +"Dashboard/InProgressOrdersSplitUp",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  orderDetailsbySubclient(value:any){
    return this._http.post(environment.apiUrl +"OrderList/SubClientOrders",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  orderDetailsPagination(value:any){
    return this._http.post(environment.apiUrl +"OrderList/OrderDetails",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  orderDetailsFilter(value:any){
    return this._http.post(environment.apiUrl +"OrderList/OrderDetailsFilter",value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
}
