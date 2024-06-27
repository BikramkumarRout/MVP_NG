import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
  private route: Router, private sharedSerice: ShareDataService,private activatedRoute: ActivatedRoute) { }

  canActivate(
    activateroutSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.sharedSerice.isGrantedPermission(activateroutSnapshot.data['permission'])
    // || activateroutSnapshot.data['permission'] === AppConsts.perMissionData.PagesCommonDashboard) {
    //   return this.checkLoggedIn(state.url);
    // }
    // else {
    //   return false;
    // }
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    if (url) {
      this.authService.redirectUrl = '/' +url;
    }
    else {
      this.route.navigate(['/home']);
    }
    return false;
  }

}
