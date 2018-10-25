import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InstagramProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstagramProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InstagramProvider Provider');
  }
  instagramLink(link){
    return this.http.get(link);
 }
}
