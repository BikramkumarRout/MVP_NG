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
    let user = JSON.parse(localStorage.getItem('user'));
    return !!user;
  }

  constructor(private messageService: MessageService, private sharedDataService: ShareDataService) { }

  setLocalStorage(user: any): void {

    this.setByPassAuth(true);
    this.currentUser = {
      id: user.userId,
      userName: user.userName,
      role: user.roleName
    };
    localStorage.setItem('securityObject', JSON.stringify(user));
    this.sharedDataService.setUserValue(this.currentUser);
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.sharedDataService.setPermission(user.grantedPermissions);
    localStorage.setItem('grantedPermissions', JSON.stringify(user.grantedPermissions));
    localStorage.setItem("bearerToken", user.encryptedAccessToken);
    localStorage.setItem("selectedFacilityId", user.facilities[0].facilityId);
    localStorage.setItem("selectedFacilityName", user.facilities[0].name);

  }

  setByPassAuth(bypass: boolean) {
    this.byPassAuth = bypass;
  }
  getByPassAuth() {
    return this.byPassAuth;
  }


  logout(): void {
    this.currentUser = null;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    localStorage.setItem('bearerToken', null);
    localStorage.removeItem("securityObject");
    localStorage.removeItem("selectedFacilityId");
    localStorage.removeItem("selectedFacilityName");
  }
}
