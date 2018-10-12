import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Injectable } from '@angular/core';


@Injectable()
export class ProfileProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;
  firedata=firebase.database().ref('/userProfile');

  constructor() {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
       this.userProfile= firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })
  

    console.log('Hello ProfileProvider Provider');
  }


UserDetails(firstName:string,lastName:string):any{
   return this.userProfile.update({firstName,lastName});
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

updateEmail(newEmail:string,oldEmail:string):Promise<any>{
  const credentials:firebase.auth.AuthCredential=
  firebase.auth.EmailAuthProvider.credential(this.currentUser.email,oldEmail);
  return this.currentUser.reauthenticateWithCredential(credentials).then(user=>{
    this.currentUser.updateEmail(newEmail).then(user=>{
      console.log('Email has been changed')
    })
  }).catch(error=>{
    console.log(error);
  })
 
}

}
