import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClinicalTeamService } from 'src/app/home/clinical-team/clinical-team.service';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { BioUploadService } from './bio-upload.service';
import { BioDto } from './bioDto';

@Component({
  selector: 'bio-upload',
  templateUrl: './bio-upload.component.html',
  styleUrls: ['./bio-upload.component.css']
})

export class BioUploadComponent implements OnInit {
  data: any;
  bio: any;
  @ViewChild('dt2') table: Table;
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  files: any;
  paitentFile = "";
  public applName;
  public phoneNumber;
  public emailId;
  submittedError;
  text2: string;
  text: string;
  public bioDetails: BioDto;
  isSpinnerVisible: boolean;
  userType: any;
  teamType: number = 0;
  currentUser: any;
  userId: any;
  id: number;
  isClinical: boolean = true;
  searchGlobalText: string;
  bioData: any;
  isNoRecorsFound;
  display: boolean;
  rowData: any;
  nameFilter: any;
  designationFilter: any;
  teamNameFilter: any;
  isDisplay: boolean;
  constructor(private confirmationService: ConfirmationService, private safePipe: SafePipe, private clinicalTeamService: ClinicalTeamService, private bioUploadService: BioUploadService, private http: HttpClient, private notify: NotifyService, private sharedDataService: ShareDataService) {

  }
  ngOnInit(): void {
    this.bioDetails = new BioDto();
    this.currentUser = this.sharedDataService.getUserValue();
    this.onGetMvpTeam();

  }

  onGetMvpTeam() {
    this.clinicalTeamService.getMvpTeam(this.teamType).subscribe(res => {
      this.bioData = res.result;
      this.isNoRecorsFound = res.result.length === 0;

    })
  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
  }

  onShowDialog(event) {
    this.bioDetails=event;
    this.display = true;
    this.rowData=event;
  }

  onDeleteUser(rowData: any) {
    this.isDisplay=false;
    this.confirmationService.confirm({
      message: AppConsts.message.bioDeleteMessage,
      header: AppConsts.message.mailDeleteHeader,
      icon: '',
      accept: () => {
        this.clinicalTeamService.DeleteUser(rowData, this.currentUser.id).subscribe(
          response => {
            this.onGetMvpTeam();
            this.isDisplay=true;
          });

      },
      reject: (type) => {

      }
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchGlobalText = "";
  }

  public onFilter(event): void {
    this.nameFilter = event.filters.name[0].value;
    this.designationFilter = event.filters.designation[0].value;
    this.teamNameFilter = event.filters.teamName[0].value;
  }

  onDialogClose(event) {
    this.display = false;
    if(!event){
      this.onGetMvpTeam();
    }
    this.bioDetails=new BioDto();
  }
}
