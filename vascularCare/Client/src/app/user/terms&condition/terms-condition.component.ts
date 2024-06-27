import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsConditionDto } from './terms-condition';
import { ShareDataService } from 'src/app/shared/core/common/sharedDataService';

@Component({
  selector: 'terms-condition',
  templateUrl: './terms-condition.component.html',
//   styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
    @Input() display;
    @Output() displayChangeTerms = new EventEmitter();
    isChecked: boolean;
    public termsConditionDto: TermsConditionDto;
  userId: any;
  currentUser: any;

  constructor(private loginService: LoginService, private notifyService: NotifyService,
    private sharedDataService: ShareDataService,
    private router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.currentUser = this.sharedDataService.getSecurityObjValue();  
      this.termsConditionDto = new TermsConditionDto();
   
    }

    onClose() {
        this.displayChangeTerms.emit(false);
      }

      onAcceptTermsCondition(event) {
        if (event.target.checked) {
          this.isChecked = true;          
        } else {
          this.isChecked = false;
        }
      }
     

      navigateTo() {
        
           this.termsConditionDto.IsAcceptTerm = this.isChecked;
           this.termsConditionDto.userId =  this.currentUser.userId;
          this.loginService.updateAcceptTermUser(this.termsConditionDto).subscribe(
            result => {
              this.router.navigate(['/dashboard']);
            });
           
        
        
      }
}
