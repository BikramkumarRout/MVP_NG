import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import * as CryptoJS from "crypto-js";
import { AppConsts } from "./app-constant";

@Injectable({
  providedIn: "root",
})
export class ShareDataService {
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();

  private input: any;
  private user: any;
  private grantedPermission: Array<string> = [];
  bearerToken: any;

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
  getPermission(param: any) {
    if (this.grantedPermission == null || this.grantedPermission.length <= 0) {
      this.grantedPermission = JSON.parse(
        localStorage.getItem("grantedPermissions")
      );
    }

    this.grantedPermission;
  }
  isGrantedPermission(param: any) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.role == "SuperUser") {
      return true;
    }

    if (this.grantedPermission == null || this.grantedPermission.length <= 0) {
      this.grantedPermission = JSON.parse(
        localStorage.getItem("grantedPermissions")
      );
    }
    if (this.grantedPermission && this.grantedPermission.length > 0) {
      return this.grantedPermission.includes(param);
    } else {
      return false;
    }

    
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
      this.user = JSON.parse(localStorage.getItem("user"));
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

  getBearerToken() {

    if (this.bearerToken == null) {
      this.bearerToken = sessionStorage.getItem("bearerToken");
    }
    return this.bearerToken;
  }
}
