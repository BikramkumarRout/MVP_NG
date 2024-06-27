import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
declare var $: any;

@Component({
    selector: 'selector-who-we-are',
    templateUrl: './whoweare.component.html',
})

export class WhoweareComponent implements OnInit {
    totalCount: any;
    bioData: any;
    teamType=2;
    clinicalTeamType=1;
    clinicalBioData: any;
    clinicalTotalCount: any;
    constructor(private sharedDataService:ShareDataService,private safePipe: SafePipe, private clinicalTeamService: ClinicalTeamService) {}

    ngOnInit(): void { 
        this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.teamType).subscribe(res =>{
            this.totalCount = res.result.totalCount;
            this.bioData = res.result.mvpTeamBio;
        });
        this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.clinicalTeamType).subscribe(res => {
            this.clinicalTotalCount = res.result.totalCount;
            this.clinicalBioData = res.result.mvpTeamBio;
            
        });
        
    }


    
  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
}

}
