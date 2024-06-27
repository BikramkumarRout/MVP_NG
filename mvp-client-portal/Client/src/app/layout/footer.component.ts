import { Component, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
 import { AppConsts } from '../shared/core/common/app-constant';
 import { AuthService } from '../user/auth.service';

 declare var $: any;

@Component({
  templateUrl: './footer.component.html',
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
   

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    
  ) {
    window.addEventListener("scroll",  this.backToTop.bind(this));
    this.backToTop();
  }

  backToTop() {
    var backTop = $('#back-to-top');
    var scrollTrigger = 200;
    var scrollTop = $(window).scrollTop();
    if (scrollTop > scrollTrigger) {
        //console.log('backotip')
        backTop.addClass('show');
    } else {
        backTop.removeClass('show');
    }
                 
  }

  backToTopClick(e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
    }, 700);
  }

  ngOnInit() {
     

  }
     

}
