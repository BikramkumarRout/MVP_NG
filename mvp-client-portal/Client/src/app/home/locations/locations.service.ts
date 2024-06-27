import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConsts } from '../../shared/core/common/app-constant';
 
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
  catchError
} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class LocationService {
  constructor(private http: HttpClient ) { }

  getLocations() {
    let url_ = AppConsts.apiUrl.vccFacility;
    return this.http.get(url_, AppConsts.httpOptions)
  //  return [
  //   {name:'Bronx',address:'2160 Powell Ave Bronx ', phone: '646-443-6164', fax: '516-232-9789', hours: '8:30am – 6:30pm',  state: 'NY', zip: 10462, gallery: ['assets/images/gallery/gallery-img-1.jpg', 'assets/images/gallery/gallery-img-2.jpg', 'assets/images/gallery/gallery-img-3.jpg', 'assets/images/gallery/gallery-img-4.jpg', 'assets/images/gallery/gallery-img-5.jpg']},
  //   {name:'Brooklyn',address:'AL', phone: '646-443-6164', fax: '516-232-9789', hours: '8:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Westchester',address:'AZ', phone: '646-443-6164', fax: '516-232-9789', hours: '8:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Williamsburg',address:'AR', phone: '646-443-6164', fax: '516-232-9789', hours: '8:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Queens',address:'CR', phone: '646-443-6164', fax: '516-232-9789', hours: '8:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Rockland County', address:'CO', phone: '646-443-6164', fax: '516-232-9789', hours: '10:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Commack',address:'CT', phone: '646-443-6164', fax: '516-232-9789', hours: '11:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Massapequa',address:'DE', phone: '646-443-6164', fax: '516-232-9789', hours: '7:30am – 6:30pm', state: 'NY', zip: 10462},
  //   {name:'Essex County',address:'FL', phone: '646-443-6164', fax: '516-232-9789', hours: '8:00am – 2:30pm', state: 'NY', zip: '01719'},
     
    

 // ];
  }
}
