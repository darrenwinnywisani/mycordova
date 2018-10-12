import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  Booking:firebase.database.Reference;
  currentUser:User;
  // firedata=firebase.database().ref('/booking');

  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
      this.currentUser=user;
      this.Booking= firebase.database().ref(`/Booking/${user.uid}`)
      }
    })
    }
  
    BookingDetails(Name:string,email:string,Location:string,event:string,Date:string,Time:string,Number:string):any{
      return this.Booking.update({Name,email,Location,event,Date,Time,Number});
   }
  }