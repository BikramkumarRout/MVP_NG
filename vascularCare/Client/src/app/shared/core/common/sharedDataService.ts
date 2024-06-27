import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import * as CryptoJS from "crypto-js";
import { AppConsts } from "./app-constant";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ShareDataService {
  SecurityObj: any;
  constructor(private http: HttpClient) { }
  url = '../assets/bio-card.json'
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();
  private isClientPortalHide = new Subject<any>();
  public isClientPortalHideObservable$ = this.isClientPortalHide.asObservable();
  private input: any;
  private user: any;
  private facilityinitiate = false;
  private grantedPermission: Array<string> = [];
  private facilityName: any;
  private facilityId: any;
  private securityObject: any;
  private bearerToken: any;
  private clinicalRefresh:boolean;
  private bioData: Array<string> = [];

  setClientPortalHide(data: boolean) {
    this.isClientPortalHide.next(data);
  }
  
  setClinicalRefreshValue(param: any) {
    this.clinicalRefresh = param;
  }

  getClinicalRefreshValue() {
    return this.clinicalRefresh;
  }
  setBioDataValue(param: any) {
    this.bioData = param;
  }

  getBioDataValue() {
    return this.bioData;
  }
  setSecurityObjValue(param: any) {
    this.SecurityObj = param;
  }

  getSecurityObjValue() {
    return this.SecurityObj;
  }
  setValue(param: any) {
    this.input = param;
  }

  getValue() {
    return this.input;
  }

  setUserValue(param: any) {
    this.user = param;
  }
  setPermission(param: any) {
    this.grantedPermission = param;
  }

  setFacilityValue(param: any) {
    this.facilityinitiate = param;
  }
  getFacilityValue() {
   return this.facilityinitiate;
  }

  getPermission(param: any) {
    if (this.grantedPermission == null || this.grantedPermission.length <= 0) {
      this.grantedPermission = JSON.parse(
        sessionStorage.getItem("grantedPermissions")
      );
    }

    this.grantedPermission;
  }
  isGrantedPermission(param: any) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if(user)
    {   
    let superUserExist = this.checkRoleExist(user.role,"SuperUser");
    if (superUserExist) {
      return true;
    }
  }

    if (this.grantedPermission == null || this.grantedPermission.length <= 0) {
      this.grantedPermission = JSON.parse(
        sessionStorage.getItem("grantedPermissions")
      );
    }
    if (this.grantedPermission && this.grantedPermission.length > 0) {
      return this.grantedPermission.includes(param);
    } else {
      return false;
    }

    

    // if(this.grantedPermission == null || this.grantedPermission.length <= 0){
    //   this.grantedPermission = JSON.parse(localStorage.getItem('grantedPermissions'));
    // }
    // if (this.grantedPermission && this.grantedPermission.length > 0) {
    //   let allGrantedPermission = param.split(',');
    //   let found = this.grantedPermission.find((val, index) => {
    //     return allGrantedPermission.includes(val)
    //   })
    //   if (found != null && found.length > 0) {
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // }
    // else {

    //   return false;
    // }
  }
  //Need to llok into code later
  // isGrantedPermission(param: [] = []) {
  //   if(this.grantedPermission == null || this.grantedPermission.length <= 0){
  //     this.grantedPermission = JSON.parse(localStorage.getItem('grantedPermissions'));
  //   }
  //   if (this.grantedPermission && this.grantedPermission.length > 0) {
  //     let allGrantedPermission = param.split(',');
  //     let found = this.grantedPermission.find((val, index) => {
  //       return allGrantedPermission.includes(val)
  //     })
  //     if (found != null && found.length > 0) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   else {

  //     return false;
  //   }

  // }
  // convertStringToArray(roles): Array{

  // }

  getUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    return user;
  }

  getUserPermissions() {
    let user = JSON.parse(sessionStorage.getItem("grantedPermissions"));
    return user;
  }

  checkRoleExist(role: any, roleName: string): boolean {
   let roleArray =  role.split(',');
   return roleArray.includes(roleName);
  }

  encryptData(msg): string {
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2(AppConsts.encryptionDecryption.key, salt, {
      keySize: keySize / 32,
      iterations: 100,
    });
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    var result = CryptoJS.enc.Base64.stringify(
      salt.concat(iv).concat(encrypted.ciphertext)
    );

    return result;
  }

  decrypt(key, ciphertextB64) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getUserValue() {
    if (this.user == null) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    return this.user;
  }
  providerRefresh(data: any) {
    this.notify.next(data);
  }
  private _subject = new Subject<any>();

  newEvent(event) {
    this._subject.next(event);
  }
  cleareEvent() {
    this._subject.next("");
  }
  //newEvent = (data: any) => this._subject.next({ data });
  getVehicleData = (): Observable<any> => this._subject.asObservable();

  get events$() {
    return this._subject.asObservable();
  }

  setSelectedFacilityId(param: any) {
    this.facilityId = param;
  }

  getSelectedFacilityId() {
    if (this.facilityId == null) {
      this.facilityId = sessionStorage.getItem("selectedFacilityId");
    }

    return this.facilityId;
  }

  setSelectedFacilityName(param: any) {
    this.facilityName = param;
  }

  getSelectedFacilityName() {
    if (this.facilityName == null) {
      this.facilityName = sessionStorage.getItem("selectedFacilityName");
    }

    return this.facilityName;
  }

  setSecurityObject(param: any) {
    this.securityObject = param;
  }

  getSecurityObject() {
    if (this.securityObject == null) {
      this.securityObject = JSON.parse(sessionStorage.getItem("securityObject"));
    }

    return this.securityObject;
  }
  
  getBearerToken() {

    if (this.bearerToken == null) {
      this.bearerToken = sessionStorage.getItem("bearerToken");
    }
    return this.bearerToken;
  }

  allex(v?): Observable <any> {
    return this.http.get<any>(
        this.url
    );
  }
 
}


