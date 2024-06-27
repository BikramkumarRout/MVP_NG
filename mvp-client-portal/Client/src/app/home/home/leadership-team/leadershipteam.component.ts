import { Component, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
import { FormBuilder, FormGroup, FormArray, Validators,ReactiveFormsModule } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
    selector: 'leadership-team',
    templateUrl: './leadershipteam.component.html',
})

export class LeadershipTeamComponent implements OnInit {
    bioData: any;
    teamType=2;
    dynamicForm: FormGroup;
    submitted = false;
    listing: any;
    totalCount: any;
    ids: any;
    idList: any;
    constructor(private sharedDataService:ShareDataService,private formBuilder: FormBuilder, private safePipe: SafePipe, private clinicalTeamService: ClinicalTeamService) {

    }
    ngOnInit(): void {
        this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.teamType).subscribe(res =>{
            this.totalCount = res.result.totalCount;
            this.bioData = res.result.mvpTeamBio;
        }); 
     }
       
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
        
    }

}
