
import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { UrlSerializer } from 'ionic-angular';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  currentPicture: string = null
  newPicture:any;
  currentUser
  firebaseRef
  pictureUrl:string;
databaseRef:firebase.database.Reference
  constructor() {
    console.log('Hello ImageProvider Provider');
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        console.log('USer:',user.uid)
      this.currentUser=user;
      this.firebaseRef = firebase.database().ref(`/DjProfile/${user.uid}`)
      }
    })

   
    
  }


  saveImage(proPicture){

    console.log(this.currentUser)
    firebase.storage().ref(`/profilePictures/${this.currentUser.uid}`).putString(proPicture, 'base64', { contentType: 'image/png' })
    .then((savedProfilePicture) => {
    
      savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
      this.pictureUrl = downloadedUrl;
        this.firebaseRef.child('/profile').set(downloadedUrl)
     
      })
     
  
      })
      console.log(this.pictureUrl)
return this.pictureUrl;
    
      
    
    // firebase.storage().ref(`/profilePictures/${this.currentUser.uid}`).putString(proPicture,'base64',{contentType:'image/png'})
    // .then(savedPicture=>{
    //   this.databaseRef.child('profile/profilePicture').set(savedPicture.downloadURL);
    // })
}

}
