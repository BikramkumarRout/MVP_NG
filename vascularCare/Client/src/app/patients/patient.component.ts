import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ProviderService } from '../providers/provider.service';
import { CommonService } from '../shared/core/common/commonService';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { saveAs } from 'file-saver';
import { PatientService } from './patient.service';
import { LazyLoadEvent } from 'primeng/api';
import { event } from 'jquery';

@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @ViewChild('dt1') table: Table;
  public portalFooter: boolean = true;

  public display: any;
  public patientId: any;
  public patientList: any;
  public facilityInfo: any;
  public facilityId: any;
  public facilities: any;
  public selectedFacilityName: any;
  first = 0;
  rows = 10;
  public userRole: any;
  public loading = false;
  public elements: any;
  public filterExpression: any;
  public searchGlobalText;
  public nameFilter: any;
  public dateFilter: any;
  public dobFilter: any;
  public idFilter: any;
  public roomFilter: any;
  public genderFilter: any;
  public statusFilter: any;
  public mrnFilter: any;
  public providerFilter: any;
  public isSpinnerVisible = false;
  public isNoRecorsFound: boolean = false;
  isProviderExist: boolean = true;
  sorting: string;
  sortingType: string;
  reuestTypes: string;
  lazyLoading: any;
  facilityHistory: any;
  totalRecords: any;

  constructor(private router: Router, private patientService: PatientService,private commonService: CommonService,
     private sharedService: ShareDataService, private providerService: ProviderService) {

  }

  ngOnInit(): void {
    this.getFacilityInfo();
    let test = this.sharedService.getValue();
    this.getRole();
    this.getPatients();
    this.setProviderMenu();
    this.reuestTypes = "Patients";
    // this.loadPastAppointments(null);
    this.loading = true;
  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

// loadPastAppointments(event: LazyLoadEvent) {
    
//   if (!this.lazyLoading) {
//     if (event.sortField == null) {
//       event.sortField = 'name';
//       this.table.sortOrder = 1;
//       this.table.sortField = 'name';
//     }
//     this.loading = true;
//     this.lazyLoading = true;
    
//       this.patientService.getPatients(null, null, 0, 0, this.facilityId, null,event).subscribe(res  => {
//             console.log(res);
//             this.patientList = res.result.patients;
//             this.totalRecords = res.result.totalCount;
//             //this.table.sortOrder = 1;
//             //this.table.sortField = 'date';
//             this.loading = false;
//             this.lazyLoading = false;
//         })
   
//   }
// }
  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else if(this.table.sortOrder = -1){
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");
    });
  }
  setProviderMenu() {
    this.providerService.isProviderExist(null, null, null, null, null).subscribe(res => {
      this.isProviderExist = res.result.isProviderExist;
    })
  }

  onFacilityEmit(facilityObj: any) {
    this.facilityId = facilityObj.facilityId;
    this.isProviderExist = facilityObj.isProviderExist;

    this.getPatients();
  }



  public onFilter(event): void {
    this.nameFilter = event.filters.name[0].value;
    this.dateFilter = event.filters.dateOfLastAppointment[0].value;
    this.dobFilter = event.filters.dob[0].value;
    this.statusFilter = event.filters.status[0].value;
    this.genderFilter = event.filters.gender[0].value;
    this.mrnFilter = event.filters.mrn[0].value;
    this.providerFilter = event.filters.provider[0].value;
    this.roomFilter = event.filters.room[0].value;
    this.idFilter = event.filters.patientId[0].value;
  }


  getPatients() {
    this.isSpinnerVisible = true;
    this.patientService.getPatients(null, null, 0, 0, this.facilityId, null).subscribe(patients => {
      this.patientList = patients.result.patients;
      this.isNoRecorsFound = patients.result.patients.length === 0;
      this.isSpinnerVisible = false;
    });
  }



  showDialog(value) {
    this.display = true;
    this.patientId = value;
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
    return this.patientList ? this.first === (this.patientList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.patientList ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }
  onDialogClose(event) {
    this.display = event;
  }

  getRole() {
    let user = this.sharedService.getUser();
    this.userRole = user.mvpRoleType;
  }

  getFacilityInfo() {
    this.facilityInfo = this.sharedService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }

}







