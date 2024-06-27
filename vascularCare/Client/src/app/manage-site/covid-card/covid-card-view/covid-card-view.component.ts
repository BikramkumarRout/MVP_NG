import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConsts } from 'src/app/shared/core/common/app-constant';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { CovidCardService } from '../covid-card.service';


declare var $: any;
@Component({
  templateUrl: './covid-card-view.component.html',
  selector: 'covidCard-view',
})
export class CovidCardViewComponent implements OnInit {
  @Input() listing: any;
  @Input() covidFile;
  @Input() facilityId;
  @Input() displayCovidPrintIcon: any;
  @Output() displayChange = new EventEmitter();
  @ViewChild('listItems') listItems: ElementRef;
  isExist: boolean = false;
  url: string | ArrayBuffer;
  safeUrl: any;
  staffmemberId: number;
  pdfUrl: any;
  isSpinnerVisible = false;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,
    private notify: NotifyService, private covidCardService: CovidCardService, private safePipe: SafePipe) { }

  ngOnInit() {
    this.isSpinnerVisible = true;
    
    this.staffmemberId = this.listing.staffMemberId;
    this.getImage();
  }

  onClose() {
    this.displayChange.emit(true);
  }
  
  getImage() {
    
    this.covidCardService.getCovidFile(this.facilityId, this.staffmemberId).subscribe(response => { 
      this.covidFile =   response.result.imageData;
      if (this.listing.isExist) {
        this.isExist = true;
      }
       let result = 'data:' + response.result.imageType + ';base64,' + response.result.imageData;      
       this.safeUrl = this.safePipe.transform(result, 'resourceUrl');
       this.isSpinnerVisible =false;   
    });
  }

  onPrint() {
    let printContent = document.getElementById('viewCard');
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
    var file = this.covidFile;
    var reader = new FileReader();
    reader.readAsDataURL(new Blob([file]));
    reader.onload = (_event) => {
      let url = reader.result as string;
      this.safeUrl = this.safePipe.transform(url, 'url');
      //this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
