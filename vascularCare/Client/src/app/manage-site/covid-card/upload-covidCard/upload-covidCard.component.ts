import { HttpClient, HttpRequest } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { CovidCardService } from '../covid-card.service';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
    templateUrl: './upload-covidCard.component.html',
    selector: 'upload-covidCard',
    styleUrls: ['./upload-covidCard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UploadCovidCardComponent implements OnInit {
    @Input() display: boolean;
    @Input() listing: any;
    @Input() covidFile;
    @Output() displayChange = new EventEmitter();
    @ViewChild('fileInput', { static: false }) el: ElementRef;
    @ViewChild('img', { static: false }) el1: ElementRef;
    @ViewChild('pdf', { static: false }) el2: ElementRef;

    uploadedFile: any;
    files: any;
    public paitentFile: any = '';
    isChecked;
    userId: any;
    userName: any;
    providerId: any;
    facilityId: any;
    facilities: any;
    facilityInfo: any;
    isFileExist: any;
    safeUrl: any;
    staffmemberId: any;
    status: string;
    isPdfUploaded: boolean;
    pdfSrc: any;
    isImg: boolean;
    numberOfTicks = 0;
    isPdfImageViewer = false;
    isExist: boolean;
    isSpinnerVisible: boolean;

    constructor(
        private http: HttpClient, private sanitizer: DomSanitizer, private safePipe: SafePipe,
        private notify: NotifyService, private covidCardService: CovidCardService, private cf: ChangeDetectorRef,
        private injector: Injector, public changeDetector: ChangeDetectorRef, private sharedDataService: ShareDataService
        ) {
        // const pdfViewer = createCustomElement(UploadCovidCardComponent,{ injector});
        // customElements.define('pdf-viewer',pdfViewer)
        setInterval(() => {
            this.numberOfTicks++;
            // require view to be updated
            this.cf.markForCheck();
        }, 1000);

    }
    ngOnInit() {
        this.getRole();
        this.getFacilityInfo()
        this.providerId = this.listing.staffMemberId;
        if (this.listing.isExist) {
            this.isFileExist = true;
        }
        this.staffmemberId = this.listing.staffMemberId;
        if(this.isFileExist){
            this.getImage();
        }


    }


    onClose() {
        this.displayChange.emit(false);
    }

    getFacilityInfo() {
        this.facilityInfo = this.sharedDataService.getSecurityObject();
        this.facilities = this.facilityInfo.facilities;
        this.facilityId = this.facilities[0].facilityId;
    }

    onFacilityEmit(facilityId: any) {
        this.facilityId = facilityId;
    }

    getRole() {
        let user = this.sharedDataService.getUser();
        this.userName = user.userName;
        this.userId = user.id;
    }

    onUpload() {
        this.isSpinnerVisible = true;

        // let url_ = AppConsts.apiUrl.saveCovidFile;
        let formData = new FormData();
        formData.append(this.paitentFile, this.uploadedFile);
        formData.append("userId", this.userId);
        formData.append("facilityId", this.facilityId);
        formData.append("staffMemberId", this.providerId);
        this.covidCardService.uploadFile(formData).subscribe(res => {
            this.notify.success(AppConsts.message.saveMessage);
            setTimeout(() => {
              this.displayChange.emit(true);
              this.isSpinnerVisible = false;

            }, 1000);
      
          })
        // const uploadReq = new HttpRequest('POST', url_, formData, {
        // });
        // this.http.request(uploadReq).subscribe((val) => {
        // },
        //     response => {
        //     },

        //     () => {
        //         this.notify.success(AppConsts.message.saveMessage);
        //         setTimeout(() => {
        //             this.displayChange.emit(true);
        //         }, 1000);
        //     },


        // );
    }

    onFileChanged1(event) {
        this.isPdfImageViewer = true;
        let img: any = document.querySelector('#uploadFile');
        if (event.target.files[0].type == 'application/pdf') {

            if (typeof (FileReader) !== 'undefined') {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.pdfSrc = e.target.result;
                };
                this.isPdfUploaded = true;
                reader.readAsArrayBuffer(img.files[0]);
                this.paitentFile = img.files[0].name;

            }
        } else {
            this.isPdfUploaded = false;
            this.changeDetector.detectChanges();
            this.isImg = true;
            let output = document.getElementById('output') as HTMLImageElement;
            output.src = "imgSrc";
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function () {
                URL.revokeObjectURL(output.src) // free memory
            }
        }
    }
    onFileChanged(event) {
        this.isPdfImageViewer = true;
        if (event.currentTarget.files[0].type == "application/pdf" || event.currentTarget.files[0].type == "image/jpeg"
            || event.currentTarget.files[0].type == "image/png" || event.currentTarget.files[0].type == "image/gif") {
            this.uploadedFile = event.currentTarget.files[0];
            let filename = event.currentTarget.files.length > 0 ? event.currentTarget.files[0].name : '';
            this.paitentFile = filename;
        }
        else {
            this.paitentFile = "";
        }
    }

    onFileDropped(event) {
        this.isPdfImageViewer = true;
        if (event[0].type == "application/pdf") {
            this.isPdfUploaded = true;
            if (!event.target) {
                for (let index = 0; index < event.length; index++) {
                    this.files = event[index];
                    this.pdfSrc = URL.createObjectURL(event[0]);
                }

            } else {
                if (event.target.files.length > 0) {
                    const file = event.target.files[0];
                    this.files = file;

                }
            }
        } else if (event[0].type == "image/jpeg" || event[0].type == "image/gif" ||
            event[0].type == "image/png") {
            this.isPdfUploaded = false;
            this.changeDetector.detectChanges();
            this.isImg = true;
            let output = document.getElementById('output') as HTMLImageElement;
            output.src = "imgSrc";
            output.src = URL.createObjectURL(event[0]);
            output.onload = function () {
                URL.revokeObjectURL(output.src);

            }
        }
        this.paitentFile = event[0].name;

    }

    reset() {
        this.isPdfImageViewer = false;
        // //         let element = document.getElementById("pdfPreview");
        // //    element.classList.add("otherclass");
        // // let pdfRemove = document.getElementById("pdf");
        // // pdfRemove.remove();
        // // let imgRemove = document.getElementById("output");
        // // imgRemove.remove();
        this.paitentFile = "";
        this.el.nativeElement.value = "";
        this.pdfSrc = "";
        if(!this.isPdfUploaded){
            let b = document.getElementById("output").removeAttribute("src");

        }

    }

    public preview() {
        // let file = this.covidFile;
        // let reader = new FileReader();
        // reader.readAsDataURL(new Blob([file]));
        // reader.onload = (_event) => {
        //     let url = reader.result as string;
        //     // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // }
    }



    getImage() {
        this.covidCardService.getCovidFile(this.facilityId, this.staffmemberId).subscribe(response => {
            if(response.result.imageData !== null)
            {
            this.isExist = true;
            let result = 'data:' + response.result.imageType + ';base64,' + response.result.imageData;      
            this.safeUrl = this.safePipe.transform(result, 'resourceUrl');
            }
            
        });
    }

    onCardRemove() {

        this.covidCardService.removeCovidFile(this.facilityId, this.staffmemberId, this.userId).subscribe(
            res => {   
                if(res.result === false )
                {
                    this.notify.error(AppConsts.message.failureMessage);
                }     
                else{        
                this.notify.success(AppConsts.message.deletedMessage);
                setTimeout(() => {
                    this.displayChange.emit(true);
                }, 1000);
            }
            }
        )
    }


}
