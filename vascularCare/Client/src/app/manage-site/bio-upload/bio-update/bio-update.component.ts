import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClinicalTeamService } from 'src/app/home/clinical-team/clinical-team.service';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { CommonService } from 'src/app/shared/core/common/commonService';
import { NotificationService } from 'src/app/shared/core/common/notification';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { BioUploadService } from '../bio-upload.service';
import { BioDto } from '../bioDto';


@Component({
    selector: 'bio-update',
    templateUrl: './bio-update.component.html',
    styleUrls: ['./bio-update.component.css']
})

export class BioUpdateComponent implements OnInit {
    data: any;
    bio: any;
    @ViewChild('bioForm') public bioForm: NgForm;

    @ViewChild('dt2') table: Table;
    @ViewChild('fileInput', { static: false }) el: ElementRef;
    @Input() display;
    @Input() rowData;
    @Input() bioDetails;
    @Output() displayChange = new EventEmitter();
    folderName = "mvpTeam";
    files: any;
    paitentFile = "";
    public applName;
    public phoneNumber;
    public emailId;
    submittedError;
    text2: string;
    text: string;
    isSpinnerVisible: boolean;
    userType: any;
    // teamType;
    currentUser: any;
    userId: any;
    id: number;
    isClinical: boolean = true;
    searchGlobalText: string;
    isNoRecorsFound;
    header: string;
    safeUrl: any;
    teamType = 1;
    isEditSave: boolean;
    format: string;
    url: string | ArrayBuffer;
    isSaved: boolean = false;
    file: any;
    constructor(private commonService: CommonService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private safePipe: SafePipe, private clinicalTeamService: ClinicalTeamService, private bioUploadService: BioUploadService, private http: HttpClient, private notify: NotifyService, private sharedDataService: ShareDataService) {

    }
    ngOnInit(): void {

        if (this.bioDetails.id) {
            this.header = "Edit Bio"
            this.commonService.getDocumentById(this.bioDetails.documentId, this.folderName).subscribe(res => {
                this.file = res.result;
                let result = 'data:' + this.file.imageType + ';base64,' + this.file.imageData;
                this.safeUrl = this.safePipe.transform(result, 'resourceUrl');
                this.isSpinnerVisible = false;
            })
            this.isEditSave = true;
        } else {
            this.header = "Upload Bio"
            this.isEditSave = false;
            this.bioDetails.teamName = "Clinical";
            this.bioDetails.teamType = 1;
            this.isClinical = true;
        }
        this.currentUser = this.sharedDataService.getUserValue();
        if (this.bioDetails.teamType === 1) {
            this.isClinical = true;

        } else {
            this.isClinical = false;

        }
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    onClose() {
        if (this.bioForm.dirty && !this.isSaved) {
            this.notificationService
                .activate(
                    AppConsts.message.notification_Default_ValidationText,
                    AppConsts.message.notification_Default_Message,
                    AppConsts.message.notification_Default_OkButton
                )
                .then((responseOK) => {
                    if (responseOK) {
                        this.displayChange.emit(true);
                    }
                });
        } else if (!this.bioForm.dirty) {
            this.displayChange.emit(true);
        } else {
            this.displayChange.emit(false);
        }
    }

    onFileDropped(event) {
        if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/gif" ||
            event[0].type == "image/png") {
            if (!event.target) {
                for (let index = 0; index < event.length; index++) {
                    this.files = event[index];
                }
            } else {
                if (event.target.files.length > 0) {
                    const file = event.target.files[0];
                    this.files = file;
                }
            }
            this.paitentFile = this.files?.name;
        }

        var reader = new FileReader();
        reader.onload = (event) => {
            console.log('readfiles event ===== ', event);
            var image = new Image();
            var fileReader = event.target as FileReader;
            this.url = fileReader.result;
        };
        reader.readAsDataURL(event[0]);


    }

    onFileChanged(event) {
        if (event.currentTarget.files[0].type == "image/jpg" || event.currentTarget.files[0].type == "image/jpeg"
            || event.currentTarget.files[0].type == "image/png" || event.currentTarget.files[0].type == "image/gif") {
            this.files = event.currentTarget.files[0];
            let filename = event.currentTarget.files.length > 0 ? event.currentTarget.files[0].name : '';
            this.paitentFile = filename;
        }
        else {
            this.paitentFile = "";
        }
    }

    reset() {
        this.paitentFile = "";
        this.el.nativeElement.value = "";
        this.url = "";
    }



    onUpload() {
        this.isSpinnerVisible = true;
        if (this.bioDetails.teamName === "Leadership") {
            this.teamType = 2;
        } else {
            this.teamType = 1;
        }
        this.userId = this.currentUser.id;
        let id = this.bioDetails.id;
        this.bioDetails.teamType = this.teamType;
        let url_ = AppConsts.apiUrl.saveUpdateMvpTeamBio;
        var formData = new FormData();
        formData.append("documentId", this.bioDetails.documentId);
        formData.append("id", this.bioDetails.id);
        formData.append(this.paitentFile, this.files);
        formData.append("userId", this.userId);
        formData.append("description", this.bioDetails.description);
        formData.append("designation", this.bioDetails.designation);
        formData.append("residency", this.bioDetails.residency);
        formData.append("fellowship", this.bioDetails.fellowship);
        formData.append("internship", this.bioDetails.internship);
        formData.append("speciality", this.bioDetails.speciality);
        formData.append("hosAndClinicAff", this.bioDetails.hosAndClinicAff);
        formData.append("education", this.bioDetails.education);
        formData.append("name", this.bioDetails.name);
        formData.append("teamType", this.bioDetails.teamType);




        const uploadReq = new HttpRequest('POST', url_, formData, {
        });
        this.http.request(uploadReq).subscribe((val) => {
            this.isSaved = true;

        },
            response => {
                this.isSpinnerVisible = false;
            },

            () => {

                setTimeout(() => {
                    this.isSpinnerVisible = false;

                }, 1000);
                this.notify.success("Saved successfully");
                this.display = false;
            }
        );
        this.bioDetails = new BioDto();
        this.reset();
    }

    onSelectedRole(value) {
        this.userType = value;
        if (this.userType === "Clinical") {
            this.teamType = 1;
            this.isClinical = true;
        } else {
            this.teamType = 2;
            this.isClinical = false;
        }


    }

    onSelectFile(event) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            if (file.type.indexOf('image') > -1) {
                this.format = 'image';
            }
            reader.onload = (event) => {
                this.url = (<FileReader>event.target).result;
            }
        }
    }

}
