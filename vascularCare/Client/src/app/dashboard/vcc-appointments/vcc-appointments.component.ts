import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Table } from 'primeng/table';
import { TransportDetailDto } from '../transport-detail/transport-detail';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

import { saveAs } from 'file-saver';

@Component({
  templateUrl: './vcc-appointments.component.html',
  selector: 'vcc-appointments',
})

export class VccAppointmentsComponent implements OnInit {
  @ViewChild('dt1') table: Table;
  @Input() displayVcc;
  @Output() displayChange = new EventEmitter();
  vccAppointmentList: any;
  searchGlobalText;
  public first = 0;
  public rows = 10;
  statusFilter: any;
  providerFilter: any;
  patientFilter: any;
  dateFilter: any;
  locationFilter: any;
  public isNoRecorsFound;
  display;
  displayTransportPopUp;
  patientId: any;
  public transportDetail: TransportDetailDto;
  facilityId: any;
  scheduledTime: any;
  vccPatientData: any;
  facilityName: string;
  reuestTypes: string;
  sorting: string;
  sortingType: string;

  constructor(private dashboardService: DashboardService,private commonService: CommonService, private sharedDataService: ShareDataService) { }

  ngOnInit() {
    this.transportDetail = new TransportDetailDto();
    this.getFacilityName();
    this.dashboardService.getVccAppointments(null, null, null, null, null, null, null).subscribe(res => {
      this.vccAppointmentList = res.result;
      this.isNoRecorsFound = res.result.length === 0;

    })
    this.reuestTypes = "Vcc Appointments";

  }

  showConfirmDialog(value) {
    this.displayTransportPopUp = true;
    this.vccPatientData = value;
    this.getVccDetailTransport();
  }


  onClose() {
    this.displayChange.emit(false);
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
    return this.vccAppointmentList ? this.first === (this.vccAppointmentList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vccAppointmentList ? this.first === 0 : true;
  }

  onClear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }
  public onFilter(event): void {
    this.patientFilter = event.filters.patient[0].value;
    this.dateFilter = event.filters.date[0].value;
    this.locationFilter = event.filters.location[0].value;
    this.statusFilter = event.filters.status[0].value;
    this.providerFilter = event.filters.provider[0].value;
  }

  getFacilityName() {
    this.facilityName = this.sharedDataService.getSelectedFacilityName();
     this.facilityId = this.sharedDataService.getSelectedFacilityId();
  }
  
  onTransportDialogClose(event) {
    this.displayTransportPopUp = event;
  }
  onProfileDialogClose(event) {
    this.display = event;
  }
  showDialog(value) {
    this.display = true;
    this.patientId = value;
  }


  getVccDetailTransport() {
    this.facilityId = this.vccPatientData.facilityId;
    this.patientId = this.vccPatientData.patientId;
    this.scheduledTime = this.vccPatientData.date;
    this.dashboardService.getVCCTransportDetail(this.facilityId, this.patientId, this.scheduledTime).subscribe(
      response => {
        // this.listing = response.result;
      });
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
    });
  }
}
