import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';

import { AppointmentService } from '../appointment.service';
import { AppointmentDetail } from './appointmentDetail';
import { saveAs } from 'file-saver';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'appointment-detail',
  templateUrl: './appointmentDetail.component.html',
  styleUrls: ['./appointmentDetail.component.css']
})

export class AppointmentDetailComponent implements OnInit, OnDestroy {
  @ViewChildren('multiselect') components: QueryList<MultiSelect>;
  @ViewChild('dt2') table: Table;
  public isNextDos: boolean;
  public isPastAppointment: boolean;
  public isFutureAppointment: boolean;
  public nextDos = 'nextDos';
  public nextDosContent = 'Next DOS'
  facilityId: number;
  pastDos: any;
  futureDos: any;
  facilityInfo: any;
  facilities: any;
  selectedFacilityName: any;
  startValue: number = 0;
  isShow: boolean;
  isSearch: boolean;
  provider: { name: string; }[];
  searchName: string;
  searchExam: string;
  searchValue1: string;
  isfocus: boolean;
  searchValue: string;
  isFiltered: boolean;
  selectedDate: any;
  display: boolean;
  patientId: any;
  userRole: any;
  nextDosData: any;
  subscription: any;
  calledPage = "appointmentDetails";
  searchProvider = [];
  facilityHistory: AppointmentDetail[] = [];
  first = 0;
  rows = 10;
  searchGlobalText;
  idFilter: any;
  roomFilter: any;
  providerFilter: any;
  examFilter: any;
  dobFilter: any;
  dateFilter: any;
  nameFilter: any;
  isNoRecorsFound: boolean = false;
  private pastAppointment = 'pastAppointment';
  private futureAppointment = 'futureAppointment';
  locationFilter: any;
  statusFilter: any;
  sorting: string;
  sortingType: string;
  reuestTypes: string;
  url: any;
  loading: boolean;
  lazyLoading: boolean;
  totalPastAppRecords: any;


  constructor(private appointmentService: AppointmentService, private http: HttpClient,
    private commonService: CommonService, private sharedDataService: ShareDataService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getFacilityInfo();
    this.subscription = this.appointmentService.notifyObservable$.subscribe((res) => {
      if (res.callBack === this.calledPage) {
        this.facilityId = +res.faclityId;
        if (this.isNextDos) {
          this.onNextDos();
        } else if (this.isPastAppointment) {
          this.onPastAppointment();
        } else if (this.isFutureAppointment) {
          this.onFutureAppointment();
        }
      }
    });
    this.onNextDos(true);
  }

  
  
  resetSort() {
    this.table.sortOrder = 0;
    this.table.sortField = '';
    this.table.reset();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.facilityHistory ? this.first === (this.facilityHistory.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.facilityHistory ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.nameFilter = event.filters.patient[0].value;
    this.dateFilter = event.filters.date[0].value;
    this.examFilter = event.filters.exam[0].value;
    this.providerFilter = event.filters.provider[0].value;
    this.roomFilter = event.filters.roomNumber[0].value;
    this.locationFilter = event.filters.location[0].value;
    this.statusFilter = event.filters.status[0].value;
  }

  showDialog(value) {
    this.display = true;
    this.patientId = value;
  }

  onDialogClose(event) {
    this.display = event;
  }

  onNextDos(ispageload: any = false) {    
    this.reuestTypes = "Next Dos";
    this.activeInactiveTab(this.nextDos);
    if (!ispageload) {
      this.resetSort();
    }
    this.appointmentService.getNextDosAppointment(null, null, 0, 0, this.facilityId, null)
      .subscribe(patients => {
        this.facilityHistory = patients.result.nextDos;
        this.nextDosContent = patients.result.isTdoayDate ? "Today’s Appointments" : 'Next DOS';
        this.table.sortOrder = 1;
        this.table.sortField = 'date';
        this.setNoRecordsFound(patients.result.nextDos.length == 0);
      });
  }
  private setNoRecordsFound(isNorecords: boolean) {
    this.isNoRecorsFound = isNorecords;
  }

  activeInactiveTab(tabDetails: any) {
    if (tabDetails === this.nextDos) {
      this.isPastAppointment = false;
      this.isFutureAppointment = false;
      this.isNextDos = true;
    } else if (tabDetails === this.pastAppointment) {
      this.isNextDos = false;
      this.isFutureAppointment = false;
      this.isPastAppointment = true;
    } else if (tabDetails === this.futureAppointment) {
      this.isNextDos = false;
      this.isPastAppointment = false;
      this.isFutureAppointment = true;
    }
  }

  onPastAppointment() {
    this.reuestTypes = "Past Appointments";
    this.resetSort();
    this.activeInactiveTab(this.pastAppointment);
    this.appointmentService.getPastAppointment(null, null,
      0, 0, this.facilityId, null).subscribe(pastDos => {
        this.facilityHistory = pastDos.result.pasAppointments;
        this.table.sortOrder = -1;
        this.table.sortField = 'date';
        this.setNoRecordsFound(pastDos.result.pasAppointments.length === 0);
      });
  }

  onFutureAppointment() {
    this.reuestTypes = "Future Appointments"
    this.activeInactiveTab(this.futureAppointment);
    this.resetSort();
    this.appointmentService.getFutureAppointment(null, null,
      0, 0, this.facilityId, null).subscribe(futureDos => {
        this.facilityHistory = futureDos.result.futureAppointments;
        this.table.sortOrder = 1;
        this.table.sortField = 'date';
        this.setNoRecordsFound(futureDos.result.futureAppointments.length === 0);
      })
  }

  getFacilityInfo() {
    this.facilityInfo = this.sharedDataService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }

  getFacilityId(facility) {
    this.facilityId = facility.facilityId;
    this.selectedFacilityName = facility.name;
  }

  customSort(event: any) {
    if (event.field == 'date') {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          value1 = new Date(value1);
        value2 = new Date(value2);
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      });
    } else {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      });
    }
  }

  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else{
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");

    })
  }

}


