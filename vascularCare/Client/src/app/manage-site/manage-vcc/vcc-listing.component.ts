import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { FacilitiesService } from '../facilities/facilities.service';
import { FacilityDto } from '../facilities/facilty';
import { VccDto } from './vcc-details';
import { VccService } from './vcc-listing.service';


@Component({
    templateUrl: './vcc-listing.component.html',
    selector: 'vcc-listing',
    styleUrls: ['./vcc-listing.component.css']
})
export class VccListingComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    public display: boolean = false;
    public vccDetails: VccDto;
    isChecked: boolean;
    checkedFacilities;
    isNoRecorsFound;
    searchGlobalText;
    nameFilter;
    rowData: any;
    id: any;
    name: any;
    isVcc: any;
    isAdministrativeOffice: any;
    isArchived: any;
    status: any;
    selected;
    stateOptions: { label: string; value: string; }[];
    vccList: any;
    phoneFilter: any;
    faxFilter: any;
    workingHourFilter: any;
    addressFilter: any;
    facilityList: FacilityDto[] = [];
    activeFacilityList: FacilityDto[] = [];
    public isSpinnerVisible = false;

    constructor(private confirmationService: ConfirmationService, private notify: NotifyService, private commonService: CommonService,
        private vccService: VccService, private facilitiesService:FacilitiesService) {

    }
    ngOnInit() {
        this.onGetVccFacilities();
        this.vccDetails = new VccDto();

    }
    
    public onFilter(event): void {
        this.nameFilter = event.filters.name[0].value;
        this.phoneFilter = event.filters.phone[0].value;
        this.faxFilter = event.filters.fax[0].value;
        this.workingHourFilter = event.filters.workingHour[0].value;
        this.addressFilter = event.filters.address[0].value;

    }

    clear(table: Table) {
        table.clear();
        this.searchGlobalText = "";
    }

    onGetVccFacilities() {
        this.isSpinnerVisible = true;
        this.vccService.getVccFacility().subscribe(res => {
            this.vccList = res.result;
            this.isSpinnerVisible = false;
        })
    }

   

    onCheckBatch(event) {
        if (event.target.checked) {
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
    }

    onShowDialog(vccDetails: any) {
        this.vccDetails = vccDetails;    
        this.display = true;
    
      }

    onDialogClose(event: any) {
        this.display = false;
        if (event) {
          this.onGetVccFacilities();
        }
        this.vccDetails = new VccDto();

      }
   

    // onCheckCampaign(event,rowData) {
    //     let data = new FacilityDto();
    //     data.Status = rowData.activeInactive == true ? 1 : 2;            
    //     data.id = rowData.id;
    //     data.name = rowData.name;
    //     data.IsVcc = rowData.isVcc;
    //     data.IsAdministrativeOffice = rowData.isAdministrativeOffice;
    //     data.IsArchived = rowData.isArchived;

    //     if (event.target.checked) {
    //         this.isChecked = true;
            
    //         this.confirmationService.confirm({
    //             message: AppConsts.message.confirmFacilityMessage,
    //             header: AppConsts.message.confirmFacilityHeader,
    //             icon: '',
    //             accept: () => {
    //                 this.vccService.updateFacility(data.id, data.name, data.IsVcc, data.IsAdministrativeOffice, data.IsArchived, data.Status).subscribe(
    //                     response => {
    //                         this.notify.success(AppConsts.message.updateMessage);
    //                         this.onGetVccFacilities();
    //                     });
    //             },
    //             reject: (type) => {
    //                 this.onGetVccFacilities();
    //             }
    //         });
    //     } else {
    //         this.isChecked = false;
           
    //         this.confirmationService.confirm({
    //             message: AppConsts.message.confirmFacilityInactiveMessage,
    //             header: AppConsts.message.confirmFacilityHeader,
    //             icon: '',
    //             accept: () => {
    //                 this.vccService.updateFacility(data.id, data.name, data.IsVcc, data.IsAdministrativeOffice, data.IsArchived, data.Status).subscribe(
    //                     response => {
    //                         this.notify.success(AppConsts.message.updateMessage);
    //                         this.onGetVccFacilities();
    //                     });
    //             },
    //             reject: (type) => {
    //                 this.onGetVccFacilities();
    //             }
    //         });
    //     }


    //  }

     onCheckCampaign(event,rowData) {
        let data = new FacilityDto();
        data.Status = rowData.activeInactive == true ? 2 : 1;            
        data.id = rowData.id;
        data.name = rowData.name;
        data.IsVcc = rowData.isVcc;
        data.IsAdministrativeOffice = rowData.isAdministrativeOffice;
        data.IsArchived = rowData.isArchived;

        if (event.target.checked) {
            this.isChecked = true;
            
            this.confirmationService.confirm({
                message: AppConsts.message.confirmFacilityMessage,
                header: AppConsts.message.confirmFacilityHeader,
                icon: '',
                accept: () => {
                    this.facilitiesService.updateFacility(data.id, data.name, data.IsVcc, data.IsAdministrativeOffice, data.IsArchived, data.Status).subscribe(
                        response => {
                            this.notify.success(AppConsts.message.updateMessage);
                            this.onGetVccFacilities();
                           
                        });
                },
                reject: (type) => {
                    this.onGetVccFacilities();
                }
            });
        } else {
            this.isChecked = false;
           
            this.confirmationService.confirm({
                message: AppConsts.message.confirmFacilityInactiveMessage,
                header: AppConsts.message.confirmFacilityHeader,
                icon: '',
                accept: () => {
                    this.facilitiesService.updateFacility(data.id, data.name, data.IsVcc, data.IsAdministrativeOffice, data.IsArchived, data.Status).subscribe(
                        response => {
                            this.notify.success(AppConsts.message.updateMessage);
                            this.onGetVccFacilities();
                            
                        });
                },
                reject: (type) => {
                    this.onGetVccFacilities();
                }
            });
        }


     }
}
