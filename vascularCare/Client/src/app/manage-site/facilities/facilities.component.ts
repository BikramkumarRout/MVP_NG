import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { FacilitiesService } from './facilities.service';
import { FacilityDto } from './facilty';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
    templateUrl: './facilities.component.html',
    selector: 'facilities',
    styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    facilityList: FacilityDto[] = [];
    activeFacilityList: FacilityDto[] = [];
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
    isSpinnerVisible: boolean;
    constructor(private confirmationService: ConfirmationService, private notify: NotifyService, private commonService: CommonService, private facilitiesService: FacilitiesService, private sharedDataService: ShareDataService
        ) {
        this.stateOptions = [{ label: 'Off', value: 'off' }, { label: 'On', value: 'on' }];

    }
    ngOnInit() {
        this.onGetFacilities(false);
    }
    
    public onFilter(event): void {
        this.nameFilter = event.filters.name[0].value;
    }

    clear(table: Table) {
        table.clear();
        this.searchGlobalText = "";
    }

    onGetFacilities(bUpdate: boolean) {
        this.isSpinnerVisible = true;
        this.facilitiesService.getActiveInActiveFacility().subscribe(res => {
            this.facilityList = res.result.activeInactiveFacilities;
            this.activeFacilityList = res.result.activeFacilities;

            if (bUpdate) {
                this.updateFacilityDropdownValues();
            }
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

    onPullFacilities(){
        this.facilitiesService.UpdateFacilityFromCerebro().subscribe(
            response => {
                this.onGetFacilities(false);
                this.notify.success(AppConsts.message.updateMessage);
                
               
            });
        
    }

    onCheckCampaign(event,rowData) {
        let data = new FacilityDto();
        data.Status = rowData.activeInactive == true ? 1 : 2;            
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
                            this.onGetFacilities(true);
                           
                        });
                },
                reject: (type) => {
                    this.onGetFacilities(false);
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
                            this.onGetFacilities(true);
                            
                        });
                },
                reject: (type) => {
                    this.onGetFacilities(false);
                }
            });
        }


     }

    /**
     * For updating the facilty drop down values
     */ 
    updateFacilityDropdownValues(): void {
        let facilities: any = this.activeFacilityList;
        let facilityInfo = this.sharedDataService.getSecurityObject();
        facilityInfo.facilities = facilities;
        sessionStorage.setItem('securityObject', JSON.stringify(facilityInfo));
        this.sharedDataService.setSecurityObject(facilityInfo);
        this.sharedDataService.setSelectedFacilityId(facilities[0].facilityId);
        this.sharedDataService.setSelectedFacilityName(facilities[0].name);
        sessionStorage.setItem("selectedFacilityId", facilities[0].facilityId);
        sessionStorage.setItem("selectedFacilityName", facilities[0].name);
    }
}
