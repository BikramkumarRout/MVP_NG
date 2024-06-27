import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, ActivatedRoute, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConsts } from '../shared/core/common/app-constant';
import { ShareDataService } from '../shared/core/common/sharedDataService';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(private authService: AuthService,
  private route: Router, private sharedSerice: ShareDataService,private activatedRoute: ActivatedRoute) { }

  canActivate(
    activateroutSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(activateroutSnapshot.data['permission'] == 'Home')
      {
        return this.checkLoggedIn(state.url);
      
      }
      let permission = activateroutSnapshot.data['permission'];
      let viewPermission = permission + '.View';
      let editPermission = permission + '.Edit';
      if(this.sharedSerice.isGrantedPermission(editPermission)) {
        return this.checkLoggedIn(state.url);

      }else if(this.sharedSerice.isGrantedPermission(viewPermission)) {
        return this.checkLoggedIn(state.url);

      }
      else {
        this.route.navigate(['/home']);
        
      }
    
    //return this.checkLoggedIn(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // log("[OnlyDigitsGuard]", "canActivateChild", next.params.id);
    return /^\d+$/.test(next.params.id);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    //alert('isloggedin---' + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      return true;
    }
    if (url) {
      this.authService.redirectUrl = '/' +url;
    }
    else {
      this.route.navigate(['/dashboard']);
    }
    return false;
  }


}
