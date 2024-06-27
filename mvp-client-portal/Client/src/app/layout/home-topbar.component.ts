import { Component, Injector, OnInit, ViewEncapsulation, Input, ElementRef, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';


@Component({
  templateUrl: './home-topbar.component.html',
  selector: 'home-topbar',
  encapsulation: ViewEncapsulation.None
})
export class HomeTopBarComponent implements OnInit {
  @ViewChild('jobActive', { static: false }) careerTab: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  user: any;
  firstName: any;
  flName: any;
  firstLastName: any;
  role: any;
  @Input() locations: any;
  loading: boolean;
  currentUrl: string;

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
  ) {
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
      if (routerEvent instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        if (this.currentUrl === '/careers/jobs') {
          this.careerTab.nativeElement.classList.add('careerActive');
        }else{
          this.careerTab.nativeElement.classList.remove('careerActive');
        }
      }

    });
  }
  ngOnInit() {
    this.user = this.authService.currentUser;
  }
  toggleMenu() {
    this.menu.nativeElement.click();
}
  checkRouterEvent(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }


  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  onHomeClick(){
    if(this.user){
      this.router.navigateByUrl('//dashboard');
    }else{
      this.router.navigateByUrl('//login');
    }
  }
  


}
