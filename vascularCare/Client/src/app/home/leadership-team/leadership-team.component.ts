import { Component, OnInit } from '@angular/core';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators,ReactiveFormsModule } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
    selector: 'leadership-team',
    templateUrl: './leadership-team.component.html',
    styleUrls: ['./leadership-team.component.css']
})

export class LeadershipTeamComponent implements OnInit {
    bioData: any;
    teamType=2;
    dynamicForm: UntypedFormGroup;
    submitted = false;
    listing: any;
    totalCount: any;
    ids: any;
    idList: any;
    constructor(private sharedDataService:ShareDataService,private formBuilder: UntypedFormBuilder, private safePipe: SafePipe, private clinicalTeamService: ClinicalTeamService) {

    }
    ngOnInit(): void {
        this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.teamType).subscribe(res =>{
            this.totalCount = res.result.totalCount;
            this.bioData = res.result.mvpTeamBio;
        });
        // this.clinicalTeamService.getMvpTeamBioByIdWithCount(this.teamType).subscribe(res =>{
        //     this.totalCount = res.result.totalCount;
        //     this.ids = res.result.mvpTeamBio;
        //     this.idList =  this.ids.map(item => item.id);
        //     this.dynamicForm = this.formBuilder.group({
        //         numberOfCards: ['', Validators.required],
        //         cards: new FormArray([])
        //     });
        //         for (let i = this.t.length; i < this.idList.length; i++) {
        //             this.clinicalTeamService.getMvpTeamBioById(this.idList[i]).subscribe(res => {
        //                 this.listing = res.result;
        //                 this.t.push(this.formBuilder.group({
        //                     name: [this.listing.name, Validators.required],
        //                     designation: [this.listing.designation, [Validators.required]],
        //                     description: [this.listing.description, [Validators.required]],
        //                     imageUrl:  [this.listing.imageUrl, Validators.required]
        
        //                 }));
        //             })
                    
                    
        //         }
        // })
        // this.clinicalTeamService.getMvpTeam(this.teamType).subscribe(res => {
        //     this.bioData = res.result;
        //     this.bioData.forEach((obj) => {
        //         let result = 'data:' + obj.fileDto.imageType + ';base64,' + obj.fileDto.imageData;
        //         let safeUrl = this.safePipe.transform(result, 'resourceUrl');
        //         obj['imgUrl'] = result;
        //     })
        // })
        
        
        
     }

       // convenience getters for easy access to form fields
       get f() { return this.dynamicForm.controls; }
       get t() { return this.f.cards as UntypedFormArray; }

       
    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
        
    }

}
