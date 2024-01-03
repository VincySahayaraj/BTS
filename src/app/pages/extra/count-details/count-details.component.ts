import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { AppDashboardComponent } from '../../dashboard/dashboard.component';
import { ValueService } from 'src/app/services/value.service';
import { OrderService } from 'src/app/services/order.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogOverviewExampleDialogComponent } from '../../Dialog-box/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CountService } from 'src/app/services/count.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface trafficChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-count-details',
  templateUrl: './count-details.component.html',
  styleUrls: ['./count-details.component.scss'],
  providers: [DatePipe, AppDashboardComponent]
})
export class CountDetailsComponent {

  //   data:any=[{
  //     "id": 1,
  //     "cgpa": 5.6,
  //     "rank": "24"
  //   }, {
  //     "id": 2,
  //     "cgpa": 8.6,
  //     "rank": "7"
  //   }, {
  //     "id": 3,
  //     "cgpa": 7.1,
  //     "rank": "9"
  //   }, {
  //     "id": 4,
  //     "cgpa": 3.1,
  //     "rank": "49"
  //   }
  // ];
  // newData: any[] = Array();
  @Input() count: any;
  type: any;
  heading: any;
  index: any;
  stateValues: any;
  stateChartShow: any = false;
  stateName: any[] = Array();
  stateOrderCount: any[] = Array();
  stateId: any[] = Array();
  totalOrderDetails: any;

  inProgressTrue: any = false;
  inprogressDetails: any;
  newOrders: any;
  researchInprogress: any;
  researchCompleted: any;
  dataEntryInProgress: any;
  dataEntryCompleted: any;

  stateWiseOrders: any;
  zipcodeWiseOrders: any;
  portalWiseOrders: any;

  zipcodeValues: any;
  zipcodeChartShow: any = false;
  zipcodeName: any[] = Array();
  zipcodeOrderCount: any[] = Array();
  zipcodeId: any[] = Array();

  portalValues: any;
  portalChartShow: any = false;
  portalName: any[] = Array();
  portalOrderCount: any[] = Array();
  portalId: any[] = Array();

  topChange: any = 'desc';
  topChangeZipCode: any = 'desc';
  topChangeState: any = 'desc';

  noOrdersState: any = false;
  noOrdersPortal: any = false;
  noOrdersZipCode: any = false;
  showOrderDetails: any = true;

  dateForm!: FormGroup;
  submitted: any = false;
  invalid: any = false;
  filterShow: any;
  date: any;
  subclientName: any;
  subclientList: any;
  portallist: any;
  statelist: any;
  picstatuslist: any;
  orderTypelist: any;
  statuslist: any = [{ statusId: 4, statusName: 'Total Orders' }, { statusId: 2, statusName: 'Completed Orders' }, { statusId: 3, statusName: 'Inprogress Orders' }];
  clientId: any;
  subclient: any;
  allOrders: any[] = Array();
  selectCustomDate: any = false;
  processingOrders: any;
  picWaitingOrders: any;
  dueOrders: any;
  searchForm: any = false;
  data: any;
  Globaldata: any;
  currentPage: number = 1;
  totalPages: any;
  paginatedData: any;
  totalRecords: any;

  displayedColumns: string[] = ['subjectAddress', 'portalName', 'dueDate', 'orderTypeName', 'subclientName', 'picStatus', 'status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public zipcodeChart!: Partial<trafficChart> | any;
  public portalChart!: Partial<trafficChart> | any;
  public stateChart!: Partial<trafficChart> | any;
  subclientId: any;

  constructor(private spinnerService: NgxSpinnerService, private authservice: AuthService, private countservice: CountService, public dialog: MatDialog, private cdRef: ChangeDetectorRef, private datePipe: DatePipe, private notifyservice: NotifyService, private router: Router, private dashboard: AppDashboardComponent, private orderservice: OrderService, private valueService: ValueService) {

    // zip code chart
    this.zipcodeChart = {
      series: this.zipcodeOrderCount,
      labels: this.zipcodeName,
      chart: {
        type: 'pie',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 220,
      },
      colors: ['#0085db', '#FAF1F1', '#9EB8D9', '#A25772', '#9AD0C2', '#B4BDFF', '#EEF296', '#213363', '#D3D04F', '#17594A', '#AF2655', '#116D6E', '#E9B824', '#1572A1', '#986D8E', '#A78295', '#C539B4', '#A10035', '#87805E', '#4CACBC', '#F0A500', '#A35D6A', '#00028C', '#0B8457'],
      plotOptions: {
        pie: {

          size: '100%',
          background: 'none',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              color: "#000",
              offsetY: 5,
            },
            value: {
              show: true,
              color: '#98aab4',
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,

        style: {
          fontSize: '12px', // Adjust the font size as needed
          fill: 'rgb(0, 0, 0)', // Customize the color of the data labels
        },
      },
      legend: {
        show: true,
      },
      responsive: [
        {
          // breakpoint: 991,
          // options: {
          //   chart: {
          //     width: 300,
          //     height: 300,
          //   },
          // },
        },
      ],
      tooltip: {
        enabled: true,
      }
    };

    // portal chart
    this.portalChart = {
      series: this.portalOrderCount,
      labels: this.portalName,
      chart: {
        type: 'pie',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 220,
      },
      colors: ['#0085db', '#FAF1F1', '#9EB8D9', '#A25772', '#9AD0C2', '#B4BDFF', '#EEF296', '#213363', '#D3D04F', '#17594A', '#AF2655', '#116D6E', '#E9B824', '#1572A1', '#986D8E', '#A78295', '#C539B4', '#A10035', '#87805E', '#4CACBC', '#F0A500', '#A35D6A', '#00028C', '#0B8457'],
      // '#3771A1','#B6B5BA','#fb977d',
      plotOptions: {
        pie: {

          size: '100%',
          background: 'none',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              color: "#000",
              offsetY: 5,
            },
            value: {
              show: true,
              color: '#98aab4',
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,

        style: {
          fontSize: '12px', // Adjust the font size as needed
          fill: 'rgb(0, 0, 0)', // Customize the color of the data labels
        },
      },
      legend: {
        show: true,
      },
      responsive: [
        {
          // breakpoint: 991,
          // options: {
          //   chart: {
          //     width: 300,
          //     height: 300,
          //   },
          // },
        },
      ],
      tooltip: {
        enabled: true,
      }
    };

    //state chart
    this.stateChart = {
      series: this.stateOrderCount,
      labels: this.stateName,
      ids: this.stateId,
      chart: {
        type: 'pie',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 220,
      },
      colors: ['#0085db', '#FAF1F1', '#9EB8D9', '#A25772', '#9AD0C2', '#B4BDFF', '#EEF296', '#213363', '#D3D04F', '#17594A', '#AF2655', '#116D6E', '#E9B824', '#1572A1', '#986D8E', '#A78295', '#C539B4', '#A10035', '#87805E', '#4CACBC', '#F0A500', '#A35D6A', '#00028C', '#0B8457'],
      plotOptions: {
        pie: {

          size: '100%',
          background: 'none',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              color: "#000",
              offsetY: 5,
            },
            value: {
              show: true,
              color: '#98aab4',
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,

        style: {
          fontSize: '12px', // Adjust the font size as needed
          fill: 'rgb(0, 0, 0)', // Customize the color of the data labels
        },
      },
      legend: {
        show: true,
      },
      responsive: [
        {
          // breakpoint: 991,
          // options: {
          //   chart: {
          //     width: 300,
          //     height: 300,
          //   },
          // },
        },
      ],
      tooltip: {
        enabled: true,
      }
    };
  }

  //pie chart slice click-zipcode
  handleChartClickzipcode = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    const pieClicked = clickedElement.getAttribute('data:pieClicked');
    if (pieClicked === 'true') {
      this.index = event.srcElement;
      const index1 = this.index.getAttribute('j');
      const data = clickedElement.getAttribute('data:value');
      this.zipcodewiseOrders(this.zipcodeName[index1]);
    }
  };

  //pie chart slice click-state
  handleChartClickstate = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    const pieClicked = clickedElement.getAttribute('data:pieClicked');
    if (pieClicked === 'true') {
      this.index = event.srcElement;
      const index1 = this.index.getAttribute('j');
      const data = clickedElement.getAttribute('data:value');
      this.statewiseOrders(this.stateId[index1]);
    }
  };

  //pie chart slice click-portal
  handleChartClickportal = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    const pieClicked = clickedElement.getAttribute('data:pieClicked');
    if (pieClicked === 'true') {
      this.index = event.srcElement;
      const index1 = this.index.getAttribute('j');
      const data = clickedElement.getAttribute('data:value');
      this.portalwiseorders(this.portalId[index1]);
    }
  };

  //order details-default
  defaultOrderDetails(value: any) {

    this.spinnerService.show();
    const data = {

      dashboard: {
        startDate: this.dateForm.value.fromDate,
        endDate: this.dateForm.value.toDate,
        clientId: value.clientId,
        subClientId: value.subClientId ? value.subClientId : this.dateForm.value.subClientId,
        type: value.type
      },
      pagination: {
        page: this.currentPage,
        limit: 10
      },
      filterTerms: {
        "searchTerm": "string",
        "sortColumn": "string",
        "sortDirection": "string"
      },
      portalID: value.portalId ? value.portalId : null,
      stateID: value.stateId ? value.stateId : null,
      orderTypeID: value.orderTypeId ? value.orderTypeId : null,
      photoStatusID: value.picStatusId ? value.picStatusId : null

    }

    this.orderservice.orderDetailsFilter(data).subscribe((response) => {
      // this.orderservice.orderDetails(data).subscribe((response) => {
      this.totalOrderDetails = response;
      if (this.totalOrderDetails.apiStatus == 1) {
        this.dataSource.data = [];
        this.showOrderDetails = false;
        this.notifyservice.showError(this.totalOrderDetails.apiStatusMessage, this.totalOrderDetails.result);
      }
      else {
        this.showOrderDetails = true;
        this.totalPages = this.totalOrderDetails.paginationDetails.totalPages;
        this.paginatedData = this.totalOrderDetails.orderDetails;
        this.totalRecords = this.totalOrderDetails.paginationDetails.totalRecords;
        if (this.paginatedData.length > 0) {
          this.dataSource.data = this.paginatedData;
          this.spinnerService.hide();
        }
        else {
          this.notifyservice.showError("Try Again", "Something went wrong");
        }
      }
    },
      (error) => {
        this.spinnerService.hide();
        // Handle error response
        if (error.status === 400) {
          this.showOrderDetails = false;
          console.error('Bad Request:', error.error, error);
          // Handle 400 Bad Request here.
          // You may display a specific error message or perform other actions.

          //this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          //this.showOrderDetails=!this.showOrderDetails;

        } else {
          console.error('An error occurred:', error);
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          // Handle other error status codes as needed.
        }
      }

    )
  }


  ngOnInit() {
    //remove subclientid-otherwise subclient based orders will append in atable
    localStorage.removeItem('subClientId');
    this.clientId = this.authservice.getClientID();
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, header) => {

      switch (header) {
        case 'subjectAddress':
          return item.orderAddress;
        case 'orderNo':
          return item.orderNo; // Adjust this based on your data structure
        case 'portalName':
          return item.portalName;
        case 'dueDate':
          return item.dueDate;
        case 'orderTypeName':
          return item.orderTypeName;
        case 'subclientName':
          return item.subclientName;
        case 'picStatus':
          return item.picStatus;
        case 'status':
          return item.status;
        default:
          return 1
      }
    };

    this.dataSource.paginator = this.paginator;
    this.count = this.valueService.getValue();

    console.log("count value", this.count);
    this.heading = this.valueService.getHeading();

    //custom date form controls
    this.dateForm = new FormGroup({
      fromDate: new FormControl(this.count.startDate, [Validators.required]),
      toDate: new FormControl(this.count.endDate, [Validators.required]),
      subClientId: new FormControl(this.count.subClientId, []),
      portalID: new FormControl(),
      stateId: new FormControl(),
      orderTypeId: new FormControl(),
      statusId: new FormControl({ value: '', disabled: true }),
      picStatusId: new FormControl(),
    });

    //research and data entry inprogress count
    this.inProgressDetails(this.count);

    //default order details
    this.defaultOrderDetails(this.count);
    this.type = this.count.type;
    if (this.type == 1) {
      this.heading = this.heading + " Total Orders";
      this.inProgressTrue = false;
    }
    else if (this.type == 3) {
      this.heading = this.heading + " Inprogress Orders";
      this.inProgressTrue = true;
    }
    else if (this.type == 2) {
      this.heading = this.heading + " Completed Orders";
      this.inProgressTrue = false;
    }
    else {
      this.heading = "Orders";
      this.inProgressTrue = false;
    }

    this.statechartGraph(this.topChange);
    this.zipCodeChartGraph(this.topChangeZipCode);
    this.portalChartGraph(this.topChangeState);
    this.subClietsList();
    this.portalList();
    this.stateList();
    this.picStatusList();
    this.orderTypeList();
  }

  get f() {
    return this.dateForm.controls;
  }
  //state pie chart
  statechartGraph(topValue: any) {
    this.stateName = [];
    this.stateOrderCount = [];
    this.stateId = [];
    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.dateForm.value.fromDate,
        endDate: this.dateForm.value.toDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      topCount: "5",
      sortOrder: topValue
    }
    this.spinnerService.show();
    this.orderservice.statechartGraph(value).subscribe((response) => {
      this.stateValues = response;
      // this.spinnerService.hide();
      this.stateChartShow = true;
      this.cdRef.detectChanges();
      if (this.stateChartShow) {
        const chartElement = document.getElementById('state');
        if (chartElement) {
          chartElement.addEventListener('click', this.handleChartClickstate);
        }
      }
      //state data
      this.stateValues.forEach((element: any) => {
        this.stateName.push(element.stateName);
        this.stateOrderCount.push(element.orderCount);
        this.stateId.push(element.stateID);
      })
      this.stateChart.series = this.stateOrderCount;
      this.stateChart.labels = this.stateName;
      this.stateChart.ids = this.stateId;
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        // Handle error response
        if (error.status === 400) {
          console.error('Bad Request:', error.error, error);
          // Handle 400 Bad Request here.
          // You may display a specific error message or perform other actions.

          //this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          this.noOrdersState = true;
          this.stateChartShow = false;
        } else {
          console.error('An error occurred:', error);
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          // Handle other error status codes as needed.
        }
      }
    )
  }

  //zipcode pie chart
  zipCodeChartGraph(topValue: any) {
    this.spinnerService.show();
    this.zipcodeName = [];
    this.zipcodeOrderCount = [];
    this.zipcodeId = [];
    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.dateForm.value.fromDate,
        endDate: this.dateForm.value.toDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      topCount: "5",
      sortOrder: topValue
    }
    this.orderservice.zipcodechartGraph(value).subscribe((response) => {
      this.zipcodeValues = response;
      this.spinnerService.hide();
      //subclient data
      this.zipcodeValues.forEach((element: any) => {
        this.zipcodeName.push(element.zipCode);
        this.zipcodeOrderCount.push(element.orderCount);
        this.zipcodeId.push(element.zipCodeID);
      })
      this.zipcodeChart.series = this.zipcodeOrderCount;
      this.zipcodeChart.labels = this.zipcodeName;

      this.zipcodeChartShow = true;
      this.cdRef.detectChanges();
      if (this.zipcodeChartShow) {
        const chartContainer = document.getElementById('zipcode');
        if (chartContainer) {
          chartContainer.addEventListener('click', this.handleChartClickzipcode);
        }
      }
    },
      (error) => {
        // Handle error response
        if (error.status === 400) {
          console.error('Bad Request:', error.error, error);
          // Handle 400 Bad Request here.
          // You may display a specific error message or perform other actions.

          //this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          this.noOrdersZipCode = true;
          this.zipcodeChartShow = false;
        } else {
          console.error('An error occurred:', error);
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          // Handle other error status codes as needed.
        }
      }
    )
  }

  //portal pie chart
  portalChartGraph(topvalue: any) {
    this.spinnerService.show();
    this.portalName = [];
    this.portalOrderCount = [];
    this.portalId = [];

    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.dateForm.value.fromDate,
        endDate: this.dateForm.value.toDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      topCount: "5",
      sortOrder: topvalue
    }
    this.orderservice.portalchartGraph(value).subscribe((response) => {
      this.portalValues = response;
      this.spinnerService.hide();
      this.portalChartShow = true;
      this.cdRef.detectChanges();
      if (this.portalChartShow) {
        const chartContainer = document.getElementById('portal');
        if (chartContainer) {
          chartContainer.addEventListener('click', this.handleChartClickportal);
        }
      }

      //portal data
      this.portalValues.forEach((element: any) => {
        this.portalName.push(element.portalName);
        this.portalOrderCount.push(element.orderCount);
        this.portalId.push(element.portalID);
      })
      this.portalChart.series = this.portalOrderCount;
      this.portalChart.labels = this.portalName;
    },
      (error) => {
        // Handle error response
        if (error.status === 400) {
          console.error('Bad Request:', error.error, error);
          // Handle 400 Bad Request here.
          // You may display a specific error message or perform other actions.

          //this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          this.noOrdersPortal = true;
          this.portalChartShow = false;

        } else {
          console.error('An error occurred:', error);
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
          // Handle other error status codes as needed.
        }
      }
    )
  }

  //statewise orders
  statewiseOrders(data: any) {
    this.spinnerService.show();
    const data2 = JSON.parse(data);
    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.count.endDate,
        endDate: this.count.endDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      pagination: {
        page: 1,
        limit: 10
      },
      stateID: data2
    }

    this.orderservice.statewiseOrders(value).subscribe((response) => {
      this.stateWiseOrders = response;
      this.totalPages = this.stateWiseOrders.paginationDetails.totalPages;
      this.paginatedData = this.stateWiseOrders.orderDetails;
      this.totalRecords = this.stateWiseOrders.paginationDetails.totalRecords;
      if (this.paginatedData.length > 0) {
        this.dataSource.data = this.paginatedData;
        this.spinnerService.hide();
      }
      else {
        this.dataSource.data = this.paginatedData;
        this.notifyservice.showError("Try Again", "Something went wrong");
        this.spinnerService.hide();
      }
    },
      (error) => {
        if (error.error.apiStatus == 1) {
          this.notifyservice.showError(error.error.result, error.error.apiStatusMessage);
        }
      }
    )
  }

  //statewise orders
  zipcodewiseOrders(data: any) {
    this.spinnerService.show();
    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.count.endDate,
        endDate: this.count.endDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      pagination: {
        page: 1,
        limit: 10
      },
      zipCode: data
    }

    this.orderservice.zipcodewiseOrders(value).subscribe((response) => {
      this.zipcodeWiseOrders = response;
      this.totalPages = this.zipcodeWiseOrders.paginationDetails.totalPages;
      this.paginatedData = this.zipcodeWiseOrders.orderDetails;
      this.totalRecords = this.zipcodeWiseOrders.paginationDetails.totalRecords;
      if (this.paginatedData.length > 0) {
        this.dataSource.data = this.paginatedData;
        this.spinnerService.hide();
      }
      else {
        this.dataSource.data = this.paginatedData;
        this.notifyservice.showError("Try Again", "Something went wrong");
        this.spinnerService.hide();
      }
    },
      (error) => {
        if (error.error.apiStatus == 1) {
          this.notifyservice.showError(error.error.result, error.error.apiStatusMessage);
        }
      }
    )
  }

  //portalwise orders
  portalwiseorders(data: any) {
    this.spinnerService.show();
    const data1 = JSON.parse(data);
    const value = {
      dashboard: {
        clientId: this.count.clientId,
        startDate: this.count.endDate,
        endDate: this.count.endDate,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        type: this.count.type
      },
      pagination: {
        page: 1,
        limit: 10
      },
      portalID: data1

    }
    this.orderservice.portalwiseOrders(value).subscribe((response) => {
      this.portalWiseOrders = response;
      this.totalPages = this.portalWiseOrders.paginationDetails.totalPages;
      this.paginatedData = this.portalWiseOrders.orderDetails;
      this.totalRecords = this.portalWiseOrders.paginationDetails.totalRecords;
      if (this.paginatedData.length > 0) {
        this.dataSource.data = this.paginatedData;
        this.spinnerService.hide();
      }
      else {
        this.dataSource.data = this.paginatedData;
        this.notifyservice.showError("Try Again", "Something went wrong");
        this.spinnerService.hide();
      }
    },
      (error) => {
        if (error.error.apiStatus == 1) {
          this.notifyservice.showError(error.error.result, error.error.apiStatusMessage);
        }
      }
    )
  }

  //inprogress details count-research and data entry
  inProgressDetails(data: any) {
    this.spinnerService.show();
    this.orderservice.inProgressDetails(data).subscribe((response) => {
      this.inprogressDetails = response;
      this.spinnerService.hide();
      this.newOrders = this.inprogressDetails.newOrders;
      this.processingOrders = this.inprogressDetails.processingOrders;
      this.picWaitingOrders = this.inprogressDetails.picWaitingOrders;
      this.dueOrders = this.inprogressDetails.dueOrders;
      this.researchInprogress = this.inprogressDetails.researchInProgress;
      this.researchCompleted = this.inprogressDetails.researchCompleted;
      this.dataEntryInProgress = this.inprogressDetails.dataEntryInProgress;
      this.dataEntryCompleted = this.inprogressDetails.dataEntryCompleted;
    })
  }

  //custom date form and filter based 
  customDate() {
    this.searchForm = true;
    this.dateRangeValidator(this.dateForm);
    this.submitted = true;
    if (!this.invalid && this.dateForm.status == 'VALID') {
      this.dateForm.value.fromDate = this.datePipe.transform(new Date(this.dateForm.value.fromDate), 'yyyy-MM-dd');
      this.dateForm.value.toDate = this.datePipe.transform(new Date(this.dateForm.value.toDate), 'yyyy-MM-dd');
      this.date = this.dateForm.value;
      this.filterShow = !this.filterShow;

      this.Globaldata = {
        startDate: this.date.fromDate,
        endDate: this.date.toDate,
        type: this.count.type,
        clientId: this.count.clientId,
        subClientId: this.subclientId ? this.subclientId : this.count.subClientId,
        orderTypeId: this.dateForm.value.orderTypeId ? this.dateForm.value.orderTypeId : null,
        picStatusId: this.dateForm.value.picStatusId ? this.dateForm.value.picStatusId : null,
        portalId: this.dateForm.value.portalID ? this.dateForm.value.portalID : null,
        stateId: this.dateForm.value.stateId ? this.dateForm.value.stateId : null
      }
      this.inProgressDetails(this.Globaldata);
      this.statechartGraph(this.topChange);
      this.zipCodeChartGraph(this.topChangeZipCode);
      this.portalChartGraph(this.topChangeState);
      this.defaultOrderDetails(this.Globaldata);
      //this.OrderCount(this.date);
    }
  }

  //filter
  openModal(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: { title: 'Modal Title', content: 'Modal Content' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  //open filter
  openFilter() {
    this.filterShow = !this.filterShow;

  }

  //close filter
  closeFilter() {
    this.filterShow = !this.filterShow;

  }

  //check whether the from date is less than to date
  dateRangeValidator(dateForm: any) {

    const fromDate = dateForm.get('fromDate').value;
    const toDate = dateForm.get('toDate').value;

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      //check whether the from date is greater than to date
      if (fromDateObj > toDateObj) {
        this.invalid = true;
        this.dateForm.setErrors({ invalidDateRange: true });
      } else {
        this.dateForm.setErrors(null);
      }
    }
  }


  // list for filter dropdown
  //sub client List
  subClietsList() {
    this.spinnerService.show();
    const client = this.clientId;
    this.countservice.subClientList(client).subscribe((response) => {
      this.subclientList = response;
      this.spinnerService.hide();
    })
  }

  //state List
  stateList() {
    this.spinnerService.show();
    this.countservice.stateList(this.clientId).subscribe((response) => {
      this.statelist = response;
      this.spinnerService.hide();

    })
  }

  //portal List
  portalList() {
    this.spinnerService.show();
    this.countservice.portalList(this.clientId).subscribe((response) => {
      this.portallist = response;
      this.spinnerService.hide();
    })
  }

  //pic status list
  picStatusList() {
    this.spinnerService.show();
    this.countservice.picStatusList().subscribe((response) => {
      this.picstatuslist = response;
      this.spinnerService.hide();
    })
  }

  //order type list
  orderTypeList() {
    this.spinnerService.show();
    this.countservice.orderTypeList().subscribe((response) => {
      this.orderTypelist = response;
      this.spinnerService.hide();
    })
  }

  //next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.default();
      if (this.searchForm) {
        this.defaultOrderDetails(this.Globaldata);
      }
      else {
        this.defaultOrderDetails(this.count);
      }

    }
  }

  //previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.searchForm) {
        this.defaultOrderDetails(this.Globaldata);
      }
      else {
        this.defaultOrderDetails(this.count);
      }
    }
  }
}



