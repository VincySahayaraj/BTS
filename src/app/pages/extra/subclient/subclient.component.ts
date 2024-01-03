import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CountService } from 'src/app/services/count.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-subclient',
  templateUrl: './subclient.component.html',
  styleUrls: ['./subclient.component.scss'],
  providers: [DatePipe]
})
export class SubclientComponent {

  displayedColumns: string[] = ['subClientName', 'orderCount', 'subClientID'];
  displayedColumnsState: string[] = ['stateName', 'orderCount', 'stateID'];
  displayedColumnsPortal: string[] = ['portalName', 'orderCount', 'portalID'];
  clientId: any;
  currentDateAndTime: any;
  value: any;
  details: any;
  stateDetails:any;
  portalDetails:any;

  currentDate: Date = new Date();
  date90DaysAgo: Date = new Date();
  startDate:any;

  totalPages: any;
  currentPage: number = 1;

  showState:any;

  dataSourceClient = new MatTableDataSource<any>();
  dataSourceState=new MatTableDataSource<any>();
  dataSourcePortal=new MatTableDataSource<any>();
  // @ViewChild(MatPaginator, { static: true }) paginator1!: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort1!: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator2!: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort2!: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator3!: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort3!: MatSort;

  @ViewChild('paginator1', { static: true }) paginator1!: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1!: MatSort;
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;
  @ViewChild('sort2', { static: true }) sort2!: MatSort;
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;
  @ViewChild('sort3', { static: true }) sort3!: MatSort;

  constructor(private countservice:CountService,private spinnerService: NgxSpinnerService,private authservice: AuthService, private orderservice: OrderService, private valueService: ValueService, private notifyservice: NotifyService, private router: Router) {

  }

  ngOnInit() {
   
    localStorage.removeItem('subClientId');
    this.clientId = this.authservice.getClientID();
    this.startDate=localStorage.getItem('monthAnalyseDate')
    this.dataSourceClient.sort = this.sort1;
    this.dataSourceClient.sortingDataAccessor = (item, header) => {
      switch (header) {
        case 'subClientID':
          return item.subClientID;
        case 'subClientName':
          return item.subClientName;
        case 'orderCount':
          return item.orderCount; // Adjust this based on your data structure
        default:
          return 1
      }
    };

    this.dataSourceClient.paginator = this.paginator1;
    this.dataSourceState.sort = this.sort2;
    this.dataSourceState.sortingDataAccessor = (item, header) => {
      switch (header) {
        case 'stateID':
          return item.stateID;
        case 'stateName':
          return item.stateName;
        case 'orderCount':
          return item.orderCount; // Adjust this based on your data structure
        default:
          return 1
      }
    };

    this.dataSourceState.paginator = this.paginator2;

//datasource portal
    this.dataSourcePortal.sort = this.sort3;
    this.dataSourcePortal.sortingDataAccessor = (item, header) => {
      switch (header) {
        case 'portalID':
          return item.portalID;
        case 'portalName':
          return item.portalName;
        case 'orderCount':
          return item.orderCount; // Adjust this based on your data structure
        default:
          return 1
      }
    };

    this.dataSourcePortal.paginator = this.paginator3;
    this.value = this.valueService.getValue();
    this.subclientDetails();
    this.statechartGraph();
    this.portalGraph();
  }

  subclientDetails() {

    this.date90DaysAgo.setDate(this.currentDate.getDate() - 90);
    const value = {
      startDate:  this.startDate,
      endDate: this.value.endDate,
      clientId: this.clientId
    }
    this.orderservice.subclientDetails(value).subscribe((response) => {
      this.details = response;
      console.log("subclient details", this.details);
      this.totalPages = this.details.totalPages;
      if (this.details.length > 0) {
        this.dataSourceClient.data = this.details;
        //console.log("data source",this.dataSourceClient.data.length)
      }
      else {
        this.notifyservice.showError("Try Again", "No Orders")
      }
    })
  }
  //redirect to orderdetails page
  orderDetailsbySubclient(id: any) {

    localStorage.setItem('subClientId', JSON.stringify(id));
    this.router.navigate(['/orderdetails'])
  }

  //state count details
  statechartGraph() {
    console.log("get start date",localStorage.getItem('monthAnalyseDate'))
   
    const value = {
      dashboard: {
        clientId: this.value.clientId,
        startDate: this.startDate,
        endDate: this.value.endDate
        // subClientId:  this.value.subClientId,
        // type: this.value.type
      },
      topCount: "1000",
      sortOrder: "desc"
    }
    this.spinnerService.show();
    this.countservice.stateOrderCount(value).subscribe((response: any) => {
      this.stateDetails = response;
      this.showState=true;
     
      console.log("state details",response);
     
      if (this.stateDetails.length > 0) {
        this.dataSourceState.data = this.stateDetails;
      }
      else {
        this.notifyservice.showError("Try Again", "No Orders")
      }
      this.spinnerService.hide();
     
    },
      (error) => {
        this.spinnerService.hide();
        // Handle error response
        if (error.status === 400) {
          console.error('Bad Request:', error.error, error);
          // Handle 400 Bad Request here.
          // You may display a specific error message or perform other actions.

          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
         
        } else {
          console.error('An error occurred:', error);
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          // Handle other error status codes as needed.
        }
      }
    )
  }

portalGraph(){
  this.spinnerService.show();
 
  const value = {
    dashboard: {
      clientId: this.value.clientId,
      startDate: this.startDate,
      endDate: this.value.endDate
      // subClientId:  this.value.subClientId,
      // type: this.value.type
    },
    topCount: "1000",
    sortOrder: "desc"
  }
  this.countservice.portalOrderCount(value).subscribe((response: any) => {
    this.portalDetails = response;
    console.log("portal data",this.portalDetails);
    this.spinnerService.hide();
    if (this.portalDetails.length > 0) {
      this.dataSourcePortal.data = this.portalDetails;
    }
    else {
      this.notifyservice.showError("Try Again", "No Orders")
    }
    this.spinnerService.hide();
   
  },
    (error) => {
      this.spinnerService.hide();
      // Handle error response
      if (error.status === 400) {
        console.error('Bad Request:', error.error, error);
        // Handle 400 Bad Request here.
        // You may display a specific error message or perform other actions.

        this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
       
      } else {
        console.error('An error occurred:', error);
        this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
        // Handle other error status codes as needed.
      }
    
})
}




  // next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.subclientDetails();
    }
  }

  // prrev page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.subclientDetails();
    }
  }
}
