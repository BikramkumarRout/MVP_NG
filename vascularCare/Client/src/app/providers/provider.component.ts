import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProviderService } from './provider.service';
import { Router } from '@angular/router';
import { CommonService } from '../shared/core/common/commonService';
import { CovidCardService } from '../manage-site/covid-card/covid-card.service';
import { saveAs } from 'file-saver';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})

export class ProviderComponent implements OnInit {
  @ViewChild('dt1') table: Table;
  public portalFooter: boolean = true;

  public pageTitle = 'Provider';
  public patientList: any;
  public first = 0;
  public rows = 10;
  public facilityId: any;
  public selectedFacilityName: any;
  public facilityInfo: any;
  public facilities: any;
  public userRole: any;
  public searchGlobalText;
  public statusFilter: any;
  public providerFilter: any;
  public isSpinnerVisible = false;
  public isNoRecorsFound;
  public displayCovidPrintIcon
  providerId: any;
  listing: any;
  covidFile: any;
  reuestTypes: string;
  sorting: string;
  sortingType: string;
  constructor(private router: Router, private providerService: ProviderService,
    private myService: CommonService, private covidCardService: CovidCardService, private sharedDataService: ShareDataService) { }

  ngOnInit(): void {
    this.getFacilityInfo();
    this.getRole();
    this.onGetProvider();
    this.setProviderMenu();
    this.reuestTypes = "Providers"

  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else{
      this.sortingType === "Dsc";
    }
    this.myService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");
    });
  }
  setProviderMenu() {
    this.myService.myMethod(this.isNoRecorsFound);
    //this.shareDataService.newEvent('clicked');
  }

  getFacilityInfo() {
    this.facilityInfo = this.sharedDataService.getSecurityObject();
    this.facilities = this.facilityInfo.facilities;
    this.facilityId = this.facilities[0].facilityId;
    this.selectedFacilityName = this.facilities[0].name;
  }

  onFacilityEmit(facilityId: any) {
    this.facilityId = facilityId;
    this.onGetProvider(true);
  }

  onGetProvider(iscalledPageProvider = false) {
    this.isSpinnerVisible = true;
    this.providerService.getProviders(null, null, 0, 0, this.facilityId, null).subscribe(patients => {
      this.patientList = patients.result.appointment;      
      this.isNoRecorsFound = patients.result.appointment.length === 0;
      this.isSpinnerVisible = false;
      if (iscalledPageProvider && patients.result.appointment.length === 0) {
        this.router.navigate(['/dashboard']);
      }
    });
    this.setProviderMenu();

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

  onClear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.statusFilter = event.filters.status[0].value;
    this.providerFilter = event.filters.primaryProvider[0].value;
  }

  getRole() {
    let user = this.sharedDataService.getUser();
    this.userRole = user.mvpRoleType;
  }

  onDialogClose(event: any){
    this.displayCovidPrintIcon = false;
  }

  onShowViewCardDialog(value) {
    this.displayCovidPrintIcon = true;
    this.listing = value;
    this.providerId = this.listing.staffMemberId;
    this.getCovidFile();
  }

  getCovidFile() {
    this.covidCardService.getCovidFile(this.facilityId,this.providerId).subscribe(files => {
      this.covidFile = files.result;
    });
  }

}

