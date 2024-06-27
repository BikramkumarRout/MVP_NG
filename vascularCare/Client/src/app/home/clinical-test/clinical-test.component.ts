import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { table } from 'console';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';
import { SafePipe } from 'src/app/shared/pipe/safeHtmlPipe';
import { ClinicalTeamService } from '../clinical-team/clinical-team.service';

@Component({
    selector: 'pm-clinical-test',
    templateUrl: './clinical-test.component.html',
    styleUrls: ['./clinical-test.component.css']
})

export class ClinicalTestComponent implements OnInit {
    // @Input() bio: any;
    data: any;
    bio: any;
    isSpinnerVisible: boolean;
    isExist: boolean;
    file: any;
    safeUrl: any;
    bioData: any;
    teamType: number=1;
    constructor(private shareDataService: ShareDataService, private safePipe: SafePipe, private route: ActivatedRoute, private clinicalTeamService: ClinicalTeamService) {

    }
    ngOnInit(): void {

        this.clinicalTeamService.getMvpTeam(this.teamType).subscribe(res => {
            this.bioData = res.result;
            this.isExist = true;
            this.bioData.forEach((obj) => {
                let result = 'data:' + obj.fileDto.imageType + ';base64,' + obj.fileDto.imageData;
                let safeUrl = this.safePipe.transform(result, 'resourceUrl');
                obj['imgUrl'] = result;
                let nameResult = obj.name.split(',');
                obj['firstName']=nameResult[0];
                
            })
        })

      

    }

    ngAfterViewInit() {
        let myDiv = document.getElementById('customScroll');
        myDiv.scrollIntoView();
        var subtitle = $('.subtitle');

        setTimeout(function () {
            subtitle.each(function () {
                if ($(this)[0].scrollHeight > $(this).height()) {
                    $(this).find('.read_more_trigger').css('display', 'block');
                }
            });
        }, 1000);
    
        $('.read_more_trigger').each(function () {
            $(this).click(function (e) {
                e.preventDefault();
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $(this).text('+ More');
                    $(this).parent('.subtitle').removeClass('subtitle_open');
                } else {
                    $(this).addClass('open');
                    $(this).parent('.subtitle').addClass('subtitle_open');
                    $(this).text('- Less');
    
                }
            })
        });
    
    
    
        $('.moreless-button').click(function (e) {
            e.preventDefault();
            $('.moretextsection').slideToggle();
            if ($('.moreless-button .more_txts').text() == "Read More") {
                $(this).children(".more_txts").text("Read Less")
            } else {
                $(this).children(".more_txts").text("Read More")
            }
        });
    
    
        $(window).resize(function () {
            var windowWidth = $(document).width();
    
            if (windowWidth > 767) {
                $('.moretextsection').show();
            } else {
    
                $('.moretextsection').hide();
            }
    
        });
    
    }

    

}
