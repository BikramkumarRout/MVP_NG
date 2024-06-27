import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { CovidCardService } from './covid-card.service';
import { saveAs } from 'file-saver';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
  templateUrl: './covid-card.component.html',
  selector: 'covid-card',
})
export class CovidCardComponent implements OnInit {
  @ViewChild('dt2') table: Table;
  public searchGlobalText;
  public display: boolean;
  public displayCovidPrintIcon: boolean;
  listing;
  providerList: any;
  facilityInfo: any;
  facilities: any;
  facilityId: any;
  selectedFacilityName: any;
  isFileExist: boolean;
  providerId: number;
  covidFile: any;
  url: string | ArrayBuffer;
  hideUpload: boolean;
  providerFilter;
  first = 0;
  page: any;
  rows: any;
  reuestTypes: string;
  sorting: string;
  sortingType: string;
  isSpinnerVisible: boolean;

  ngOnInit() {
    this.getFacilityInfo();
    this.onGetProvider();
    this.reuestTypes = "COVID-19 Cards";

  }

  constructor(private covidCardService: CovidCardService,  private commonService: CommonService, private sharedDataService: ShareDataService) { }

  clear(table: Table) {
    this.searchGlobalText = '';
    table.clear();
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

  onGetProvider(iscalledPageProvider = false) {
    this.isSpinnerVisible = true;
    this.covidCardService.getCovidCardProvider().subscribe(patients => {
      this.providerList = patients.result.appointment;
      this.isSpinnerVisible = false;

    });

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

  onDialogClose(event: any) {
    this.display = false;
    this.displayCovidPrintIcon = false;
    if(event){
      this.onGetProvider();
    }
    this.first= this.first;
    this.rows = this.rows;
  }

  onShowDialog(value?) {
    this.display = true;
    this.listing = value;
  }


  onShowViewCardDialog(value) {
    this.displayCovidPrintIcon = true;
    this.listing = value;
    this.providerId = this.listing.staffMemberId;
    
  }

  public onFilter(event): void {
    this.providerFilter = event.filters.primaryProvider[0].value;
  }

  paginate(event?) {
    this.first = event.first;
    this.rows = event.rows;
}

}
