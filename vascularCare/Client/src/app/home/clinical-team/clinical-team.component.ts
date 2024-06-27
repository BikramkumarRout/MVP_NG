import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from './clinical-team.service';

@Component({
    selector: 'pm-clinical-team',
    templateUrl: './clinical-team.component.html',
    styleUrls: ['./clinical-team.component.css']
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
        // if(!this.isRefresh){
        // this.clinicalTeamService.getMvpTeam(this.teamType).subscribe(res => {
        //     this.bioData = res.result;
        //     // this.sharedataService.setBioDataValue(this.bioData);
        //     this.isExist = true;
        //     this.bioData.forEach((obj) => {
        //         let result = 'data:' + obj.fileDto.imageType + ';base64,' + obj.fileDto.imageData;
        //         let safeUrl = this.safePipe.transform(result, 'resourceUrl');
        //         obj['imgUrl'] = result;
        //         let nameResult = obj.name.split(',');
        //         obj['firstName']=nameResult[0];

        //     })
        // })
        // }
        // else{
        //     this.bioData= this.sharedataService.getBioDataValue();
        //     this.bioData.forEach((obj) => {
        //         let result = 'data:' + obj.fileDto.imageType + ';base64,' + obj.fileDto.imageData;
        //         let safeUrl = this.safePipe.transform(result, 'resourceUrl');
        //         obj['imgUrl'] = result;
        //         let nameResult = obj.name.split(',');
        //         obj['firstName']=nameResult[0];

        //     })
        // }

    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
    }

    readMore(value) {

    }
}
