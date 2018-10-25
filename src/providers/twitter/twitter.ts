import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TwitterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TwitterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TwitterProvider Provider');
  }
  twitterLink(link){
    return this.http.get(link);
 }
}
