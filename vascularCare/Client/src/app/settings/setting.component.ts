import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './setting.component.html',
  selector: 'app-setting',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public portalFooter: boolean = true;
  hideResetPassword: boolean;

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.userType === 1) {
      this.hideResetPassword = true;
    }
  }

  ngAfterViewInit() {
    let myDiv = document.getElementById('customScroll');
    myDiv.scrollIntoView();
  }
}