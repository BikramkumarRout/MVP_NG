import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingPagesService {

  constructor() { }
  getLandingPagess(){
    return [
      {label:'Dashboard',value:1},
      {label:'Manage-corporations',value:2},
      {label:'Facilities',value:3},
      {label:'VCC',value:4},
      {label:'Manage-users',value:5},
      {label:'Manage-roles',value:6},
      {label:'Manage-permissions',value:7},
      {label:'Covid-card',value:8},
      {label:'Application-setting',value:9},
      {label:'Mail-campaign-management',value:10},
      {label:'Email-manager',value:11},
      {label:'Hr-menu',value:12},
      {label:'Biographies',value:13}
    ]
  }
}
