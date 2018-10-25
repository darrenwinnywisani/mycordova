import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    
  }
  facebookLink(link){
     return this.http.get(link);
  }
}
