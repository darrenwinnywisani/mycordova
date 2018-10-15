import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/database';
import 'rxjs/add/operator/map';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the AddDjProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddDjProvider {

  DjProfile:firebase.database.Reference;
  currentUser:User;
  firedata=firebase.database().ref('/DjProfile');
  constructor() {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.DjProfile=firebase.database().ref(`/DjProfile/${user.uid}`)
      }
    })
  }
  getDjProfile():firebase.database.Reference{
    return this.DjProfile;
  }

  updateNames(email:string,stageName:string,desc:string,contact:string,Location:string,genre:string):Promise<any>{
     return this.DjProfile.update({email,stageName,desc,contact,Location,genre})
  }
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
   }

  

}
