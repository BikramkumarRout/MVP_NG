import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { NotifyService } from 'src/app/shared/core/common/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { TermsConditionDto } from './terms-condition';

@Component({
  selector: 'terms-condition',
  templateUrl: './terms-condition.component.html',
//   styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
    @Input() display;
    @Input() allowDashboard;
    @Output() displayChange = new EventEmitter();
    isChecked: boolean;
    public termsConditionDto: TermsConditionDto;
  userId: any;

  constructor(private loginService: LoginService, private notifyService: NotifyService,
    private router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {  
      this.getRole(); 
      this.termsConditionDto = new TermsConditionDto();
   
    }

    onClose() {
        this.displayChange.emit(false);
      }

      onAcceptTermsCondition(event) {
        if (event.target.checked) {
          this.isChecked = true;          
        } else {
          this.isChecked = false;
        }
      }
      getRole() {
        let user = JSON.parse(localStorage.getItem("user"))
        if(user){
          this.userId = user.id;
        }
        
      }

      navigateTo() {
         if(this.allowDashboard) {
           this.termsConditionDto.IsAcceptTerm = this.isChecked;
           this.termsConditionDto.userId =  this.userId;
          this.loginService.updateAcceptTermUser(this.termsConditionDto).subscribe(
            result => {
            });
           this.router.navigate(['/dashboard']);
           
        }
        
      }
}
