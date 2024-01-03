import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewEncapsulation, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ValueService } from 'src/app/services/value.service';
import { CountService } from 'src/app/services/count.service';
import { NotifyService } from 'src/app/services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


export interface profitExpanceChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

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

export interface barChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    MatListModule,
    NgApexchartsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule
  ],
  providers: [DatePipe]
})
export class AppDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public profitExpanceChart!: Partial<profitExpanceChart> | any;
  public stateChart!: Partial<profitExpanceChart> | any;
  public trafficChart!: Partial<trafficChart> | any;
  public totalOrderChart!: Partial<trafficChart> | any;
  public dueChart!: Partial<trafficChart> | any;
  public barChart!: Partial<barChart> | any;
  public portalChart!: Partial<profitExpanceChart> | any;

  subclientList: any;
  date: any;
  totalOrders: any;
  completedOrders: any;
  inProgressOrders: any;
  subclient: any;
  myOrders: any;
  currentDateAndTime: any;
  count: any;
  subclientName: any;
  heading: any = "Today";
  clientId: any;
  clientName: any;
  has_SubClient: any;
  has_State: any;
  dateForm: FormGroup;
  details: any;

  fixedMonth: any;
  subClientsValue: any;
  subClientMonth: any[] = Array();
  subClientName: any[] = Array();
  subClientGraph: any[] = Array();

  monthOrderCount: any[] = Array();

  submitted: any = false;
  invalid: any = false;
  subclientshow: any = false;
  stateshow: any = false;
  portalshow: any = false;
  totalOrdershow: any = false;
  duechartShow: any = false;
  nodueHeading: any = false;
  nototalOrderHeading: any = false;
  selectCustomDate: any = false;
  inprogress: any = false;
  subClientPresent: any = true;
  statePresent: any = true;
  portalPresent: any = true;
  subClientMonthChartShow: any = false;
  showSubGraph: any = false;

  dateList: string[] = ['Today', 'Last 7 days', 'Last 30 days', 'Custom Date'];
  subclientClientName: any[] = Array();
  subclientOrderCount: any[] = Array();
  stateName: any[] = Array();
  stateOrderCount: any[] = Array();
  portalName: any[] = Array();
  portalOrderCount: any[] = Array();
  dueDate: any[] = Array();
  dueOrderCount: any[] = Array();
  subclientdataPoints: any = Array();
  statedataPoints: any = Array();
  portaldataPoints: any = Array();
  duedataPoints: any = Array();
  totalOrderCount: any[] = Array();
  inprogressOrderCount: any[] = Array();
  completedOrderCount: any[] = Array();
  allOrders: any[] = Array();
  seriesMonthOrder: any[] = Array();

  //date
  currentDate: Date = new Date();
  date30DaysAgo: Date = new Date();
  date90DaysAgo: Date = new Date();
  date90DaysAgostate: Date = new Date();

  monthDate: any;
  filterShow: any;
  subClientIndex: any;
  currentMonth: any;
  indexValue: any;
  subClient:any;

  constructor(private authservice: AuthService, private spinnerService: NgxSpinnerService, public dialog: MatDialog, private fb: FormBuilder, private notifyservice: NotifyService, private datePipe: DatePipe, private router: Router, private cdRef: ChangeDetectorRef, private valueService: ValueService, private countservice: CountService) {

    //portal chart
    this.portalChart = {
      series: [
        {
          name: `Portal Wise Count`,
          data: this.portalOrderCount,
          color: '#b6b7b7'
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',

        },

      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: this.portalName,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };


    // total order chart
    this.totalOrderChart = {
      series: this.myOrders,
      labels: ['Completed Orders', 'Inprogress Orders', 'Total Orders'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
      },
      colors: ['#b6b7b7', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'bottom',
        itemMargin: {
          horizontal: 10,
          vertical: 3,
        },
        onItemClick: {
          toggleDataSeries: false,
        },
      },
      responsive: [
        {
          breakpoint: 1080,
          options: {
            chart: {
              width: 300,
              height: 400
            },
          },
        },
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 300,
              height: 250

            },
            legend:{
              show:false,
              enabled:false
            }
            // dataLabels: {
            //   enabled: false,
            // },
          },
         
        },
        {
          breakpoint: 480, // Set your desired breakpoint
          options: {
            legend: {
              show: false, // Hide legend for screens smaller than the breakpoint
            }
          }
        }
      ],
      tooltip: {
        enabled: true,
      },
    };

    //sub client-bart chart
    this.barChart = {
      series: [],

      colors: ['rgb(0, 133, 219);', 'rgb(251, 151, 125)', '#FFC8C8', '#EEE2DE', '#A9A9A9', '#CDFAD5', '#B5D5C5', '#D6E4E5', '#A7D2CB', '#E6D2AA', '#94B49F', '#E5707E'],
      chart: {
        type: "bar",
        height: 500,

        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              enabled: false,
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          // borderRadius: 10,
          strokeLinecap: 'round',
          shape: 'round',
          // endingShape: 'round',
          // backgroundColor: ['round', 'round', 'round', 'round'],
          dataLabels: {
            // position: 'top', // Adjust the position if needed
            enabled: false,
            show: false
          },
          // Add these lines to create a border around each bar
          stroke: {
            linecap: 'round',
            width: 1,
            colors: ['transparent']
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      categories: this.subClientMonth,
      xaxis: {
        type: "category",
        categories: []
      },
      yaxis: {
        categories: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200]
      },
      dataLabels: {
        enabled: false,
      },
      Labels: { show: false },
      legend: { show: false },
      fill: {
        opacity: 1
      }
    };

    //custom date form controls
    this.dateForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
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

  //orders based on sub client
  subclientChange(subclient: any) {
    this.subclient = subclient;
    this.subclientList.forEach((element: any) => {
      if (element.subClientId == subclient) {
        this.subclientName = element.subClientName;
      }
    })
    // this.subClientId=subclient;
    //update in service file with the existing one
    const data = {
      subClientId: this.subclient
    }
    const existingData = this.valueService.getValue()
    const updatedData = { ...existingData, ...data };
    this.valueService.updateValue(updatedData);
    this.allOrders = [];
    this.OrderCount(this.date);
    this.dueOrderGraph(this.date);
  }

  //sub client List
  subClietsList() {
    // this.spinnerService.show();
    const client = this.clientId;
    this.countservice.subClientList(client).subscribe((response) => {
      this.subclientList = response;
      this.spinnerService.hide();
    })
  }

  ngOnInit() {
    this.clientId = this.authservice.getClientID();
    this.clientName = this.authservice.getClientName();
    this.has_SubClient = this.authservice.hasSubClient();
    this.has_State = this.authservice.hasState();

    this.count = this.valueService.getValue();

    if (this.has_SubClient == 0) {
      this.subClientPresent = false;
    }
    else {
      this.subClientPresent = true;
    }

    if (this.has_State == 0) {
      this.statePresent = false;
    }
    else {
      this.statePresent = true;
    }
    localStorage.removeItem('subClientId');
    this.currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.subClietsList();
    // this.subClientOrders();
    // this.stateGraph();
    // this.portalGraph();
    this.monthWiseSubclients(3);

    // Sub client chart
    this.profitExpanceChart = {
      series: [
        {
          name: 'Order Count for last 3 months',
          data: this.subclientOrderCount,
          color: '#0085db',
        }
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'flat',
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: this.subclientClientName,

        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    // state chart
    this.stateChart = {
      series: [
        {
          name: `State Count`,
          data: this.stateOrderCount,
          color: '#fb977d',
        }
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'flat',
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: this.stateName,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    // Due chart
    this.dueChart = {
      series: this.dueOrderCount,
      labels: this.dueDate,
      chart: {
        type: 'pie',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 220,
      },
      colors: ['#b6b7b7', '#fb977d', '#0085db'],
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
      },
    };

    //state data
    // this.statedataPoints.forEach((element: any) => {
    //   this.stateName.push(element.stateName);
    //   this.stateOrderCount.push(element.orderCount)
    // }
    // )
    // // portal data
    // this.portaldataPoints.forEach((element: any) => {
    //   this.portalName.push(element.portalName);
    //   this.portalOrderCount.push(element.orderCount)
    // }
    // )

    //default today orders
    const today = {
      fromDate: this.currentDateAndTime,
      toDate: this.currentDateAndTime
    }
    this.date = today;
    this.OrderCount(this.date);
    this.dueOrderGraph(this.date);
    this.valueService.updateHeading(this.heading);
  }

  //total order count
  OrderCount(date: any) {
    this.spinnerService.show();
    const type1 = {
      startDate: date.fromDate,
      endDate: date.toDate,
      clientId: this.clientId,
      subClientId: this.subclient ? this.subclient : null,
      type: 1
    }

    const type2 = {
      startDate: date.fromDate,
      endDate: date.toDate,
      clientId: this.clientId,
      subClientId: this.subclient ? this.subclient : null,
      type: 2
    }
    const type3 = {
      startDate: date.fromDate,
      endDate: date.toDate,
      clientId: this.clientId,
      subClientId: this.subclient ? this.subclient : null,
      type: 3
    }

    //total orders to get total,inprogress, completed orders
    forkJoin([
      this.countservice.orderCount(type1),
      this.countservice.orderCount(type2),
      this.countservice.orderCount(type3)
    ]).subscribe(
      ([response1, response2, response3]) => {

        // Handle each response individually
        this.totalOrders = response1;
        this.totalOrders = this.totalOrders.totalOrders;
        this.completedOrders = response2;
        this.completedOrders = this.completedOrders.completedOrders;
        this.inProgressOrders = response3;
        this.inProgressOrders = this.inProgressOrders.inProgressOrders;

        // Populate allOrders array
        this.allOrders = [this.completedOrders, this.inProgressOrders, this.totalOrders];
        this.spinnerService.hide();
        //show the graph only value is greater than 0
        for (let i = 0; i < this.allOrders.length; i++) {
          if (this.allOrders[i] != 0) {
            this.totalOrderChart.series = this.allOrders;
            this.totalOrdershow = true;
            this.nototalOrderHeading = false;
          }
          else {
            this.nototalOrderHeading = true;
            this.totalOrdershow = false;
          }
        }
      },
      error => {
        console.error('Error fetching data:', error);
        this.spinnerService.hide();
      }
    );
  }

  get f() {
    return this.dateForm.controls;
  }

  //custom date form
  customDate() {
    this.dateRangeValidator(this.dateForm);
    this.submitted = true;
    if (!this.invalid && this.dateForm.status == 'VALID') {
      this.dateForm.value.fromDate = this.datePipe.transform(new Date(this.dateForm.value.fromDate), 'yyyy-MM-dd');
      this.dateForm.value.toDate = this.datePipe.transform(new Date(this.dateForm.value.toDate), 'yyyy-MM-dd');
      this.date = this.dateForm.value;
      //update the date in service
      const existingData = this.valueService.getValue()
      const data = {
        startDate: this.date.fromDate,
        endDate: this.date.toDate
      }
      const updatedData = { ...existingData, ...data };
      this.valueService.updateValue(updatedData);
      //call the orders based on the above given date
      this.OrderCount(this.date);
    }
  }

  //date filter
  dateFilter(value: any) {

    //current date and time
    this.allOrders = [];
    // if (value == 'customDate') {
    //   this.selectCustomDate = true;
    //   this.heading = "Orders for Below Dates"
    // }
    // else if (value == 'today') {
    //   this.selectCustomDate = false;
    //   const today = {
    //     fromDate: this.currentDateAndTime,
    //     toDate: this.currentDateAndTime
    //   }
    //   this.date = today;
    //   this.OrderCount(this.date);
    //   this.heading = "Today";

    // }
    // else if (value == 'week') {
    //   this.selectCustomDate = false;
    //   this.heading = "Last 7 days"
    //   this.date30DaysAgo.setDate(this.currentDate.getDate() - 7);
    //   const formattedDate7DaysAgo = this.datePipe.transform(this.date30DaysAgo, 'yyyy-MM-dd') || '';
    //   const week = {
    //     fromDate: formattedDate7DaysAgo,
    //     toDate: this.currentDateAndTime
    //   }
    //   this.date = week;
    //   this.OrderCount(this.date);
    // }
    // else if (value == 'month') {
    //   this.heading = "Last 30 days"
    //   this.selectCustomDate = false;
    //   this.date30DaysAgo.setDate(this.currentDate.getDate() - 30);
    //   const formattedDate30DaysAgo = this.datePipe.transform(this.date30DaysAgo, 'yyyy-MM-dd') || '';
    //   const oneMonth = {
    //     fromDate: formattedDate30DaysAgo,
    //     toDate: this.currentDateAndTime
    //   }
    //   this.date = oneMonth;
    //   this.OrderCount(this.date);
    // }
    // else {
      
    //}
   
    this.selectCustomDate =  !this.selectCustomDate;
    this.dueOrderGraph(this.date);
  }

  //subclient graph
  subClientOrders() {
    // this.spinnerService.show();
    this.date90DaysAgo.setDate(this.currentDate.getDate() - 90);
    const formattedDate90DaysAgo = this.datePipe.transform(this.date90DaysAgo, 'yyyy-MM-dd') || '';
    const threemonth = {
      startDate: formattedDate90DaysAgo,
      endDate: this.currentDateAndTime,
      clientId: this.clientId
    }
    const date = threemonth;
    if (this.subClientPresent) {
      this.countservice.subClientGraph(date).subscribe((response) => {
        this.subclientdataPoints = response;
        this.subclientshow = true;
        //subclient data
        this.subclientdataPoints.forEach((element: any) => {
          this.subclientClientName.push(element.subClientName);
          this.subclientOrderCount.push(element.orderCount)
        }
        )
        // this.spinnerService.hide();
      },
        (error) => {
          if (error.error.apiStatus == 2) {
            this.subClientPresent = false;
            // this.spinnerService.hide();
          }
        }
      )
    }
  }

  //state graph
  // stateGraph() {
  //   // this.spinnerService.show();
  //   this.date90DaysAgostate.setDate(this.currentDate.getDate() - 90);
  //   const formattedDate90DaysAgo = this.datePipe.transform(this.date90DaysAgostate, 'yyyy-MM-dd') || '';
  //   const threemonth = {
  //     startDate: formattedDate90DaysAgo,
  //     endDate: this.currentDateAndTime,
  //     clientId: this.clientId
  //   }
  //   this.spinnerService.show();
  //   const date = threemonth;
  //   if (this.statePresent) {
  //     this.countservice.stateGraph(date).subscribe((response) => {
  //       this.statedataPoints = response;
  //       this.stateshow = true;
  //       //state data
  //       this.statedataPoints.forEach((element: any) => {
  //         this.stateName.push(element.stateName);
  //         this.stateOrderCount.push(element.orderCount)
  //       }
  //       )
  //       this.spinnerService.hide();
  //     },
  //       (error) => {
  //         if (error.error.apiStatus == 2) {
  //           this.statePresent = false;
  //           this.spinnerService.hide();
  //         }
  //       }
  //     )
  //   }
  // }

  //portal graph
  // portalGraph() {
  //   this.spinnerService.show();
  //   this.date90DaysAgo.setDate(this.currentDate.getDate() - 90);
  //   const formattedDate90DaysAgo = this.datePipe.transform(this.date90DaysAgo, 'yyyy-MM-dd') || '';
  //   const threemonth = {
  //     startDate: formattedDate90DaysAgo,
  //     endDate: this.currentDateAndTime,
  //     clientId: this.clientId
  //   }
  //   const date = threemonth;
  //   this.countservice.portalGraph(date).subscribe((response) => {
  //     this.portaldataPoints = response;
  //     this.portalshow = true;

  //     this.portalName=[];
  //     this.portalOrderCount=[];
  //     //state data
  //     this.portaldataPoints.forEach((element: any) => {
  //       this.portalName.push(element.portalName);
  //       this.portalOrderCount.push(element.orderCount)
  //     }
  //     )
  //     this.spinnerService.hide();
  //   },
  //     (error) => {
  //       if (error.error.apiStatus == 2) {
  //         this.portalPresent = false;
  //         this.spinnerService.hide();
  //       }
  //     }
  //   )
  // }

  //due chart
  dueOrderGraph(date: any) {
    // this.spinnerService.show();
    this.dueOrderCount = [];
    this.dueDate = [];
    const today = {
      startDate: date.fromDate,
      endDate: date.toDate,
      clientId: this.clientId,
      subClientId: this.subclient ? this.subclient : null,
    }

    this.countservice.dueOrderGraph(today).subscribe((response) => {
      this.duedataPoints = response;
      // due data
      this.duedataPoints.forEach((element: any) => {
        const formattedDate = this.datePipe.transform(element.dueDate, 'yyyy-MM-dd') || '';
        this.dueDate.push(formattedDate);
        this.dueOrderCount.push(element.orderCount);
      })
      for (let i = 0; i < this.dueOrderCount.length; i++) {
        // if (this.dueOrderCount[i] != 0) {
        this.dueChart.series = this.dueOrderCount;
        this.dueChart.labels = this.dueDate;

        const allZeros = this.dueOrderCount.every(element => element === 0);
        this.spinnerService.hide();
        if (allZeros) {
          this.nodueHeading = true;
          this.duechartShow = false;
        } else {
          this.nodueHeading = false;
          this.duechartShow = true;
        }
      }
    })
  }

  //inprogress table routing
  inProgressDetails(type: any) {
    const details = {
      startDate: this.date.fromDate,
      endDate: this.date.toDate,
      type: type,
      clientId: this.clientId,
      subClientId: this.subclient ? this.subclient : null
    }
    this.details = details;
    if (type == 3) {
      if (this.inProgressOrders > 0) {
        this.valueService.updateValue(details);
        this.router.navigate(['countdetails']);
      }
      else {
        this.notifyservice.showError("No Inprogress Orders", "Try Later!")
      }
    }

    else if (type == 2) {
      if (this.completedOrders > 0) {
        this.valueService.updateValue(details);
        this.router.navigate(['countdetails'])
      }
      else {
        this.notifyservice.showError("No Completed Orders", "Try Later!")
      }
    }

    else if (type == 1) {
      if (this.totalOrders > 0) {
        this.valueService.updateValue(details);
        this.router.navigate(['countdetails'])
      }
      else {
        this.notifyservice.showError("No Total Orders", "Try Later!");
      }
    }
    else {
      this.notifyservice.showError("No Total Orders", "Try Later!");
    }
  }

  //filter orders based on date range
  insideOrderCountFilter(date: any) {

    if (date == 'today') {
      const data = {
        fromDate: this.currentDateAndTime,
        toDate: this.currentDateAndTime,
      }
      this.date = data;
      this.heading = "Today";
      this.selectCustomDate = false;
      this.OrderCount(data);
    }
    else if (date == 'week') {
      this.date30DaysAgo=new Date();
      this.date30DaysAgo.setDate(this.currentDate.getDate() - 7);
      const formattedDate7DaysAgo = this.datePipe.transform(this.date30DaysAgo, 'yyyy-MM-dd') || '';
      const data = {
        fromDate: formattedDate7DaysAgo,
        toDate: this.currentDateAndTime,
      }
      this.date = data;
      this.heading = "Last 7 days";
      this.selectCustomDate = false;
      this.OrderCount(data);
    }
    else if (date == 'month') {

      this.selectCustomDate = false;
      this.date30DaysAgo=new Date();
      this.date30DaysAgo.setDate(this.currentDate.getDate() - 30);
      const formattedDate30DaysAgo = this.datePipe.transform(this.date30DaysAgo, 'yyyy-MM-dd') || '';
      const data = {
        fromDate: formattedDate30DaysAgo,
        toDate: this.currentDateAndTime,
      }
      this.date = data;
      this.heading = "Last 30 days";
      this.selectCustomDate = false;
      this.OrderCount(data);
    }
    else {
      // this.selectCustomDate = false;
    }
    this.valueService.updateHeading(this.heading);
  }

  //redirect to subclient orders page
  subclientDetails() {
    this.router.navigate(['/subclientdetails']);
  }

  //monthwise orders
  monthWiseSubclients(month: any) {
    // this.spinnerService.show();
    this.date30DaysAgo = new Date();
    if (month == 3) {
      this.date30DaysAgo.setDate(this.currentDate.getDate() - 90);
    }
    else if (month == 6) {
      this.date30DaysAgo.setDate(this.currentDate.getDate() - 180);
    }
    else if (month == 12) {
      this.date30DaysAgo.setDate(this.currentDate.getDate() - 360);
    }
    else {
    }

    //conver the date into correct format
    this.fixedMonth = this.datePipe.transform(this.date30DaysAgo, 'yyyy-MM-dd') || '';
    localStorage.setItem('monthAnalyseDate',this.fixedMonth);
    const value = {
      startDate: this.fixedMonth,
      endDate: this.currentDateAndTime,
      clientId: this.clientId
    }

    // this.spinnerService.show();
    this.countservice.sublclientOrderByMonth(value).subscribe((response) => {
       this.subClientsValue = response;
      this.seriesMonthOrder = [];
      this.subClientMonth = [];

      for (let i = 0; i <= this.subClientsValue.length - 1; i++) {
        this.monthOrderCount = [];
        this.subClientsValue[i].monthOrderCount.forEach((order: any) => {
          this.monthOrderCount.push(order.count)
        })
        const client = {
          name: this.subClientsValue[i].subClient,
          data: this.monthOrderCount
        }
        this.seriesMonthOrder.push(client);
        // this.allSubClients.push()
      }
      this.subClientMonth = [];
      const Monthvalue = this.subClientsValue[0].monthOrderCount;

      Monthvalue.forEach((element: any) => {
        this.monthDate = element.month;
        this.subClientMonth.push(this.monthDate);
      })
      this.subClientMonthChartShow = false;
      this.barChart.series = this.seriesMonthOrder;
      this.barChart = { ...this.barChart, xaxis: { ...this.barChart.xaxis, categories: [...this.subClientMonth] } };

      this.subClientMonthChartShow = true;
      this.cdRef.detectChanges();
      this.spinnerService.hide();
      if (this.subClientMonthChartShow) {
        const chartContainer = document.getElementById('barchart');
        if (chartContainer) {
          chartContainer.addEventListener('click', this.handleChartSubClient);
        }
      }
    },
      (error) => {
        this.spinnerService.hide();
        this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
      }
    )
  }
  //bar chart slice click-zipcode and portal
  handleChartSubClient = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    console.log("clicked element",clickedElement);
    this.subClientIndex = event.srcElement;

    //index for month
    const j = this.subClientIndex.getAttribute('j');
    const data = this.subClientIndex.getAttribute('val');
    //index for client
    if (data) {
      this.indexValue = this.subClientIndex.getAttribute('index');
      //current month
      this.currentMonth = this.subClientMonth[j];
      //all months
      const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      //get correct index for the above array
      const monthValue = allMonths.indexOf(this.currentMonth) + 1;

      const year = 2023;
      //date range of particular month
      const dateRange = this.getMonthDateRange(year, monthValue);
      const startDate = this.datePipe.transform(dateRange.startDate, 'yyyy-MM-dd') || '';
      const endDate = this.datePipe.transform(dateRange.endDate, 'yyyy-MM-dd') || '';
      //call the zipcode and portal graph
      this.zipcodeOrderCount(this.subClientsValue[this.indexValue], startDate, endDate);
      this.portalOrderGraph(this.subClientsValue[this.indexValue], startDate, endDate);

      this.subClient=this.subClientsValue[this.indexValue].subClient;

    }
    else {
      this.notifyservice.showError("Try again Later!", "No Orders");
    }
  };

  //find date range for month
  getMonthDateRange(year: number, month: number): { startDate: Date, endDate: Date } {
    // Ensure the month is within valid range (1 to 12)
    if (month < 1 || month > 12) {
      throw new Error('Invalid month. Month must be between 1 and 12.');
    }

    // Create a new Date object for the first day of the given month
    const startDate = new Date(year, month - 1, 1); // Note: month is 0-indexed, so we subtract 1

    // Create a new Date object for the last day of the given month
    const endDate = new Date(year, month, 0); // Setting day to 0 gets the last day of the previous month

    // Return the start and end dates
    return { startDate, endDate };
  }

  //zipcount order
  zipcodeOrderCount(id: any, startDate: any, endDate: any) {
    // this.spinnerService.show();
    const value = {
      dashboard: {
        startDate: startDate,
        endDate: endDate,
        clientId: this.clientId,
        subClientId: id.subClientID,
        type: 4
      },
      topCount: "10",
      sortOrder: "desc"
    }

    this.countservice.zipCodeOrderCount(value).subscribe((response: any) => {
      this.statedataPoints = response;
      this.stateName = [];
      this.stateOrderCount = [];
      //zipcode data
      this.statedataPoints.forEach((element: any) => {
        this.stateName.push(element.zipcode);
        this.stateOrderCount.push(element.orderCount)
      }
      )
      this.stateChart.xaxis.categories = this.stateName;
      this.stateChart.series[0].data = this.stateOrderCount;
      this.stateChart = { ...this.stateChart, xaxis: { ...this.stateChart.xaxis, categories: [...this.stateName] } };
    
      this.stateshow = true;
      this.showSubGraph = true;
      this.spinnerService.hide();
    },
      (error) => {
        this.statePresent = false;
        this.spinnerService.hide();
        this.notifyservice.showError(error.error.apiStatusMessage, error.error.result)
      }
    )
  }

  //portal count order
  portalOrderGraph(id: any, startDate: any, endDate: any) {

    const value = {
      dashboard: {
        startDate: startDate,
        endDate: endDate,
        clientId: this.clientId,
        subClientId: id.subClientID,
        type: 4
      },
      topCount: "10",
      sortOrder: "desc"
    }

    this.countservice.portalOrderCount(value).subscribe((response: any) => {
      this.portaldataPoints = response;
      this.portalName = [];
      this.portalOrderCount = [];
      //portal data
      this.portaldataPoints.forEach((element: any) => {
        this.portalName.push(element.portalName);
        this.portalOrderCount.push(element.orderCount)
      }
      )

      this.portalshow = true;
      this.showSubGraph = true;
      this.portalChart.xaxis.categories = this.portalName;
      this.portalChart.series[0].data = this.portalOrderCount;
      this.portalChart = { ...this.portalChart, xaxis: { ...this.portalChart.xaxis, categories: [...this.portalName] } };
      this.spinnerService.hide();
    },
      (error) => {
        this.portalPresent = false;
        this.spinnerService.hide();
        this.notifyservice.showError(error.error.apiStatusMessage, error.error.result)
      }
    )
  }
}
