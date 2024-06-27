import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../../clinical-team/clinical-team.service';
import { Location } from '@angular/common';
@Component({
    selector: 'pm-bio-details',
    templateUrl: './bio-details.component.html',
    styleUrls: ['./bio-detail.component.css']
})

export class BioDetailsComponent implements OnInit {
    data: any;
    bio: any;
    bioData: any;
    safeUrl: any;
    isSpinnerVisible: boolean;
    teamType: number = 1;
    bioId: any;
    isDisplay: boolean;
    constructor(private shareDataService: ShareDataService, private safePipe: SafePipe,private location: Location,
        private clinicalTeamService: ClinicalTeamService, private router: Router, private route: ActivatedRoute) {

    }
    ngOnInit(): void {
        this.bioId = JSON.parse(this.route.snapshot.paramMap.get('bioId'));
        this.onGetBioDetail();

    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    onGetBioDetail() {
        this.isSpinnerVisible = true;
        this.clinicalTeamService.getMvpTeamBioById(this.bioId).subscribe(res => {
            this.bioData = res.result;
            this.isSpinnerVisible = false;

            let result = 'data:' + this.bioData.fileDto.imageType + ';base64,' + this.bioData.fileDto.imageData;
            this.safeUrl = this.safePipe.transform(result, 'resourceUrl');
            this.isDisplay=true;


        })

    }

    goBackToListing(){
        this.shareDataService.setClinicalRefreshValue(true);
        this.location.back();
    }
}
