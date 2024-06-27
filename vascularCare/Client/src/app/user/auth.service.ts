import { Injectable } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';
import { ShareDataService } from '../shared/core/common/sharedDataService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;
  byPassAuth: boolean = false;

  get isLoggedIn(): boolean {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return !!user;
  }

  constructor(private messageService: MessageService, private sharedDataService: ShareDataService) { }

  setLocalStorage(user: any): void {

    this.setByPassAuth(true);
    this.currentUser = {
      id: user.userId,
      userName: user.userName,
      role: user.roleName,
      mvpRoleType: user.mvpUserType,
      landingPagePath: user.landingPagePath,
      isAcceptTerm: user.isAcceptTerm,
      userType: user.userType,
    };    
    sessionStorage.setItem('securityObject', JSON.stringify(user));
    this.sharedDataService.setUserValue(this.currentUser);
    sessionStorage.setItem('user', JSON.stringify(this.currentUser));
    this.sharedDataService.setPermission(user.grantedPermissions);
    sessionStorage.setItem('grantedPermissions', JSON.stringify(user.grantedPermissions));
    sessionStorage.setItem("bearerToken", user.encryptedAccessToken);
    if(user.facilities != null){
      this.sharedDataService.setSelectedFacilityId(user.facilities[0].facilityId);
      sessionStorage.setItem("selectedFacilityId", user.facilities[0].facilityId);
      this.sharedDataService.setSelectedFacilityName(user.facilities[0].name);
      sessionStorage.setItem("selectedFacilityName", user.facilities[0].name);
    }

  }

  setByPassAuth(bypass: boolean) {
    this.byPassAuth = bypass;
  }
  getByPassAuth() {
    return this.byPassAuth;
  }


  logout(): void {
    this.currentUser = null;   
    this.sharedDataService.setUserValue(this.currentUser);    
    this.sharedDataService.setSecurityObject(null);
    this.sharedDataService.setSelectedFacilityId(null);
    this.sharedDataService.setSelectedFacilityName(null);
    sessionStorage.removeItem("selectedFacilityId");
    sessionStorage.removeItem("selectedFacilityName");
    sessionStorage.removeItem("user");
    sessionStorage.setItem('bearerToken', null);
    sessionStorage.removeItem("securityObject");
    sessionStorage.clear();
    localStorage.clear();
  }
}
