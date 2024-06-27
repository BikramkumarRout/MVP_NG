import { Component, Input, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../../clinical-team/clinical-team.service';

@Component({
    selector: 'bioDetails-selector',
    templateUrl: './bio-card-details.component.html',
    styleUrls: ['./bio-card-details.component.css']
})

export class BioCardDetailsComponent implements OnInit {
    @Input() item: any;
    @Input() teamType;
    listing: any;
    isImage: boolean = false;
    hideReadMore: boolean;
    constructor(private clinicalTeamService: ClinicalTeamService, private safePipe: SafePipe) { }
    ngOnInit(): void {
        if(this.teamType===2){
            this.hideReadMore=true;
        }
        this.clinicalTeamService.getMvpTeamBioById(this.item.id).subscribe(res => {

            this.listing = res.result;
            let result = 'data:' + this.listing.fileDto.imageType + ';base64,' + this.listing.fileDto.imageData;
            let safeUrl = this.safePipe.transform(result, 'resourceUrl');
            this.listing['imgUrl'] = result;
            this.isImage = true;
            let nameResult = this.listing.name.split(',');
            this.listing['firstName'] = nameResult[0];
        })
    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }
}
