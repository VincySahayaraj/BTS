import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor() { }

  // private myValue: any = '';
  private myHeading:any='';

   public myValue:any={
startDate:'',
endDate:'',
type:'',
clientId:'',
subClientId:''
  }

  getValue(): any {
    this.myValue = localStorage.getItem('client');
    return this.myValue ? JSON.parse(this.myValue) : null;
    // return this.myValue;
  }

  getHeading():any{
    const storedHeading = localStorage.getItem('heading');
    return storedHeading ? JSON.parse(storedHeading) : null;
  }

  updateValue(newValue: any): void {
    localStorage.setItem('client', JSON.stringify(newValue));
    // this.myValue = newValue;
  }

  updateHeading(heading:any){
    localStorage.setItem('heading', JSON.stringify(heading));
  }
}
