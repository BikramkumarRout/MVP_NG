import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import * as moment from 'moment';
import { MailCampaignTextService } from '../email-manager.service';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { CommonService } from 'src/app/shared/core/common/commonService';
@Component({
    templateUrl: './preview-file.component.html',
    selector: 'preview-file',
    styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {
    @ViewChild('dt2') table: Table;
    @Input() displayFile: boolean;
    @Input() documentId: number;
    @Input() folderName: string;
    @Output() displayFileChange = new EventEmitter();
    public listingData;
    public searchGlobalText;
    isNoRecorsFound: boolean = false;
    file: any;
    safeUrl: any;
    isExist: boolean;
    isSpinnerVisible: boolean = false;

    constructor(private commonService: CommonService, private sharedDataService: ShareDataService, private safePipe: SafePipe, private emailService: MailCampaignTextService

    ) {

    }

    ngOnInit() {
        this.isSpinnerVisible = true;
        this.getImage();
    }


    onClose() {
        this.displayFileChange.emit(false);
    }

    onPreview() {

    }

    getImage() {
        this.isSpinnerVisible = true;
        this.commonService.getDocumentById(this.documentId, this.folderName).subscribe(response => {
            this.file = response.result.imageData;
            this.isExist = true;
            let result = 'data:' + response.result.imageType + ';base64,' + response.result.imageData;
            this.safeUrl = this.safePipe.transform(result, 'resourceUrl');
            this.isSpinnerVisible = false;
        });
    }

    onPrint() {
        let printContent = document.getElementById('filePreview');
        let documentClone = $("html").clone();
        let printContainer = "printwrap";
        documentClone[0].getElementsByTagName('body')[0].innerHTML = "<div id='" + printContainer + "'>" + printContent.innerHTML + "</div>";
        let WinPrint = window.open('', '', 'left=300,top=0,width=1000,height=700,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        setTimeout(() => {
            WinPrint.print();
            WinPrint.close();
        }, 1000);
    }

    public preview() {
        var file = this.file;
        var reader = new FileReader();
        reader.readAsDataURL(new Blob([file]));
        reader.onload = (_event) => {
            let url = reader.result as string;
            this.safeUrl = this.safePipe.transform(url, 'url');
            //this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    }


}
