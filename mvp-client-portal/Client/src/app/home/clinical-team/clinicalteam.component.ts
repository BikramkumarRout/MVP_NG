import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from './clinical-team.service';

@Component({
    selector: 'pm-clinical-team',
    templateUrl: './clinicalteam.component.html',
})

export class ClinicalTeamComponent implements OnInit {
    data: any;
    bio: any;
    isSpinnerVisible: boolean;
    isExist: boolean;
    file: any;
    safeUrl: any;
    bioData: any;
    teamType: number = 1;
    isRefresh: boolean;
    totalCount: any;
    constructor(private sharedataService: ShareDataService, private safePipe: SafePipe, private route: ActivatedRoute, private clinicalTeamService: ClinicalTeamService) {

    }
    ngOnInit(): void {
        this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.teamType).subscribe(res => {
            this.totalCount = res.result.totalCount;
            this.bioData = res.result.mvpTeamBio;
            
        });
        

    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    readMore(value) {

    }
}
