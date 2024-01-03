import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html'
})
export class AppSamplePageComponent implements OnInit {


  data:any=[{
    "id": 1,
    "cgpa": 5.6,
    "rank": "24"
  }, {
    "id": 2,
    "cgpa": 8.6,
    "rank": "7"
  }, {
    "id": 3,
    "cgpa": 7.1,
    "rank": "9"
  }, {
    "id": 4,
    "cgpa": 3.1,
    "rank": "49"
  }
];
  constructor() { }

  ngOnInit(): void {

   this.data.forEach((element:any)=>{

    console.log("element",element)

    if(element.cgpa>8 && element.rank<10){
      console.log("value",element)
    }
   })
  }


  
}
