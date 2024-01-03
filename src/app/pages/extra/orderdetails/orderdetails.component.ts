import { V } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CountService } from 'src/app/services/count.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { ValueService } from 'src/app/services/value.service';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
export interface orderData {
  orderAddress: string;
  orderNo: number;
  portalName: string;
  stateName: string;
  subclientName: string;
  zipcode: string;
  status: string;
}


@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
  providers: [DatePipe]
})
export class OrderdetailsComponent {

  data: any;
  currentPage: number = 1;
  totalPages: any;
  paginatedData: any;
  totalRecords: any;


  portalID: any;
  stateID: any;
  orderTypeID: any;
  photoStatusID: any;

  searchValue: string = '';

  displayedColumns: string[] = ['subjectAddress', 'portalName', 'dueDate', 'orderTypeName', 'subclientName', 'picStatus', 'status'];
  clientId: any;
  currentDateAndTime: any;
  totalOrderDetails: any;
  date: any;
  value: any;
  subClientId: any;
  showOrders: any = false;
  subClientOrders: any;
  currentDate: Date = new Date();
  date90DaysAgo: Date = new Date();

  dateForm!: FormGroup;
  submitted: any = false;
  invalid: any = false;
  showTable: any = false;
  filterShow: any;

  subclientList: any;
  portallist: any;
  statelist: any;
  picstatuslist: any;
  orderTypelist: any;
  statuslist: any = [{ statusId: 4, statusName: 'Total Orders' }, { statusId: 2, statusName: 'Completed Orders' }, { statusId: 3, statusName: 'Inprogress Orders' }];

  filmIcon = faFilm;
  dueDate: any;
  formattedDate: any;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private notifyservice: NotifyService, private countservice: CountService, private spinnerService: NgxSpinnerService, private authservice: AuthService, private orderservice: OrderService, private valueService: ValueService, private datePipe: DatePipe) {

  }

  ngOnInit() {

    // localStorage.removeItem('subClientId');
    this.clientId = this.authservice.getClientID();
    this.currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const today = {
      fromDate: this.currentDateAndTime,
      toDate: this.currentDateAndTime
    }
    this.date = today;
    this.value = this.valueService.getValue();
    this.subClientId = localStorage.getItem('subClientId');
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

    this.subClietsList();
    this.portalList();
    this.stateList();
    this.orderTypeList();
    this.picStatusList();


    //custom date form controls
    this.dateForm = new FormGroup({
      fromDate: new FormControl(this.value.startDate, [Validators.required]),
      toDate: new FormControl(this.value.endDate, [Validators.required]),
      subClientId: new FormControl(this.subClientId, []),
      portalID: new FormControl(),
      stateId: new FormControl(),
      orderTypeId: new FormControl(),
      statusId: new FormControl(),
      picStatusId: new FormControl(),
    });

    this.dataSource.paginator = this.paginator;
    this.loadData();
  }

  ngAfterViewInit() {
    // Make the header and first column sticky
    const stickyHeader = document.querySelector('.OrderID');
    const stickyColumn = document.querySelector('.subjectAddress');

    if (stickyHeader && stickyColumn) {
      this.sort.sortChange.subscribe(() => {
        stickyHeader.scrollLeft = 0;
      });

      stickyColumn.addEventListener('scroll', () => {
        stickyHeader.scrollLeft = stickyColumn.scrollLeft;
      });
    }
  }

  //open filter
  openFilter() {
    this.filterShow = true;
  }

  //close filter
  closeFilter() {
    this.filterShow = false;
  }

  // Form controls
  get f() {
    return this.dateForm.controls;
  }

  //total order details
  loadData() {
    this.spinnerService.show();
    this.filterShow = false;
    this.date90DaysAgo.setDate(this.currentDate.getDate() - 90);
    const dummyDate = this.datePipe.transform(this.date90DaysAgo, 'yyyy-MM-dd');
    const fromDate = this.datePipe.transform(this.dateForm.value.fromDate, 'yyyy-MM-dd');
    const toDate = this.datePipe.transform(this.dateForm.value.toDate, 'yyyy-MM-dd');
    const value = {
      dashboard: {
        // startDate: this.subClientId ? dummyDate : this.currentDateAndTime,
        startDate:fromDate,
        endDate:toDate,
        // endDate: this.value.endDate,
        clientId: this.clientId,
        subClientId: this.dateForm.value.subClientId,
        type: 1
      },
      pagination: {
        page: this.currentPage,
        limit: 20
      },
      filterTerms: {
        searchTerm: this.searchValue,
        sortColumn: "",
        sortDirection: ""
      },
      portalID: this.dateForm.value.portalID ? this.dateForm.value.portalID : null,
      stateID: this.dateForm.value.stateId ? this.dateForm.value.stateId : null,
      orderTypeID: this.dateForm.value.orderTypeId ? this.dateForm.value.orderTypeId : null,
      StatusId: this.dateForm.value.statusId ? this.dateForm.value.statusId : null,
      photoStatusID: this.dateForm.value.picStatusId ? this.dateForm.value.picStatusId : null
    }
    
    this.orderservice.orderDetailsFilter(value).subscribe((response: any) => {
      this.data = response;
      this.totalPages = this.data.paginationDetails.totalPages;
      this.paginatedData = this.data.orderDetails;
      this.totalRecords = this.data.paginationDetails.totalRecords;
      this.dataSource.data = this.paginatedData;
      this.showTable = true;
      this.spinnerService.hide();
    },
      (error) => {
        if (error.error.apiStatus == 1) {
          this.notifyservice.showError(error.error.apiStatusMessage, error.error.result);
        }
        this.showTable = false;
        this.spinnerService.hide();
      }
    );
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

  // next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData();
    }
  }

  // prrev page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }
}

