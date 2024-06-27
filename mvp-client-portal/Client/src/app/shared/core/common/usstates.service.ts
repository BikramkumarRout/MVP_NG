import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsstatesService {

  constructor() { }
  getStates(){
    return [
      {name:'Alaska',code:'AK'},
      {name:'Alabama',code:'AL'},
      {name:'Arizona',code:'AZ'},
      {name:'Arkansas',code:'AR'},
      {name:'California',code:'CR'},
      {name:'Colorado',code:'CO'},
      {name:'Connecticut',code:'CT'},
      {name:'Delaware',code:'DE'},
      {name:'Florida',code:'FL'},
      {name:'Gregoria',code:'GA'},
      {name:'Hawaii',code:'HI'},
      {name:'Idaho',code:'ID'},
      {name:'Illinois',code:'IL'},
      {name:'Indiana',code:'IN'},
      {name:'Iowa',code:'IA'},
      {name:'Kansas',code:'KS'},
      {name:'Kentucky',code:'KY'},
      {name:'Maine',code:'ME'},
      {name:'Maryland',code:'MD'},
      {name:'Massachusetts',code:'MA'},
      {name:'Michigan',code:'MI'},
      {name:'Minnesota',code:'MI'},
      {name:'Utah',code:'UT'},
      {name:'Oregon',code:'OR'},
      {name:'Ohio',code:'OH'},
      {name:'New York',code:'NY'},
      {name:'Nevada',code:'NV'},
      {name:'Washington',code:'WH'},
      {name:'Virginia',code:'VA'},
      {name:'Texas',code:'TX'},
      {name:'West Virginia',code:'WV'},
      {name:'Vermont',code:'VT'},
      {name:'Wyoming',code:'WY'},
      {name:'South Dakota',code:'SD'},
      {name:'Oklahoma',code:'OK'},
      {name:'New Jersey',code:'NJ'},
      {name:'New Mexico',code:'NM'},
      {name:'New Hemisphere',code:'NH'},
      {name:'Mississippi',code:'MS'},
      {name:'Montana',code:'MT'},

    ]
  }
}
