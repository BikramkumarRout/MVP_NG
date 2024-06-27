import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { ProfileService } from '../profile.service';
import { UpcomingAppointment } from './upcomingAppointment';
import { saveAs } from 'file-saver';


@Component({
  selector: 'profile-upcomingAppointment',
  templateUrl: './upcoming-appointment.component.html',
  styleUrls: ['./upcoming-appointment.component.css']

})
export class UpcomingAppointmentComponent implements OnInit {
  @Input() patientId: any;
  @Input() facilityId: any;
  @ViewChild('dt1') table: Table;
  first = 0;
  rows = 10;
  dateFilter;
  examFilter;
  providerFilter;
  roomFilter;
  idFilter;
  upcomingAppointment: UpcomingAppointment[] = [];
  searchGlobalText;
  isNoRecorsFound: boolean = false;
  statusFilter: any;
  reuestTypes: string;
  sorting: string;
  sortingType: string;

  constructor(private profileService: ProfileService,private commonService: CommonService) {}

  ngOnInit() {
    this.profileService.getUpcomingAppointment(null,
      null, 0, 0,
      this.patientId, this.facilityId).subscribe(result => {
        this.upcomingAppointment = result.result.upcomingAppointments;
        this.isNoRecorsFound = result.result.upcomingAppointments.length === 0;
      })
      this.reuestTypes = "Upcoming Appointments"
  }

  onExport() {
    this.sorting = this.table.sortField;
    if(this.table.sortOrder = 1){
      this.sortingType === "Asc";
    }else{
      this.sortingType === "Dsc";
    }
    this.commonService.downloadExcel(this.facilityId,this.sorting,this.sortingType,this.reuestTypes,this.patientId).subscribe(res =>{
      saveAs(res, this.reuestTypes + ".xlsx");
    });
  }
  public onFilter(event): void {
    this.dateFilter = event.filters.date[0].value;
    this.examFilter = event.filters.exam[0].value;
    this.providerFilter = event.filters.provider[0].value;
    this.roomFilter = event.filters.roomNumber[0].value;
    this.statusFilter=event.filters.status[0].value;
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
    return this.upcomingAppointment ? this.first === (this.upcomingAppointment.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.upcomingAppointment ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";

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



}
