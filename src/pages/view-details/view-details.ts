import { InstagramProvider } from './../../providers/instagram/instagram';
import { TwitterProvider } from './../../providers/twitter/twitter';
// import { BookingPage } from './../booking/booking';
// import { HomePage } from './../home/home';
// import { AddDjProvider } from './../../providers/add-dj/add-dj';
// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

// /**
//  * Generated class for the ViewDetailsPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-view-details',
//   templateUrl: 'view-details.html',
// })
// export class ViewDetailsPage {


//   temparr=[];
//   filteredusers=[];

//   constructor(public navCtrl: NavController, public navParams: NavParams, private DjPROV:AddDjProvider) {

//     this.filteredusers=this.navParams.get('data');

//     // this.DjPROV.getallusers().then((res: any) => {
//     //   this.filteredusers = res;
//     //   this.temparr = res;
//     //   console.log('response',this.filteredusers)})

//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad ViewDetailsPage');
//   }

//   book(){
//     this.navCtrl.push(BookingPage,{
//       data:this.filteredusers
//     })
//     console.log('email',this.filteredusers)
//   }

//   goback(){
//     this.navCtrl.setRoot(HomePage);
//    }

// }


import { FacebookProvider } from './../../providers/facebook/facebook';
import { BookingPage } from './../booking/booking';
import { HomePage } from './../home/home';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewDjPage } from '../view-dj/view-dj';


/**
 * Generated class for the ViewDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-details',
  templateUrl: 'view-details.html',
})
export class ViewDetailsPage {


  temparr=[];
  filteredusers=[];
  facebook:string='https://www.facebook.com/';
  twitter:string='https://www.facebook.com/';
  Instagram:string='https://www.facebook.com/';
  constructor(public navCtrl: NavController, 
    private facebookProv:FacebookProvider,public navParams: NavParams,
     private DjPROV:AddDjProvider, private twitterprov:TwitterProvider,
      private instagramProv:InstagramProvider) {
    
    this.filteredusers=this.navParams.get('data');
    // this.facebook=this.filteredusers[0].facebookLink;

    console.log('facebook',this.facebook)
    // this.DjPROV.getallusers().then((res: any) => {
    //   this.filteredusers = res;
    //   this.temparr = res;
    //   console.log('response',this.filteredusers)})

  }

  ionViewDidEnter() {
    this.filteredusers=[];
    this.filteredusers=this.navParams.get('data');
    console.log('ionViewDidLoad ViewDetailsPage');
  }
  goback(){
    this.navCtrl.setRoot(HomePage);
   }

  instagramlink(){
    this.instagramProv.instagramLink(this.Instagram).subscribe(results=>{
      console.log('instagram',results)
    });
    
  }
 
  book(){
    this.navCtrl.push(BookingPage,{
      data:this.filteredusers
    })
    console.log('email',this.filteredusers)
  }
  
  facebooklink(){
    this.facebookProv.facebookLink(this.facebook).subscribe(results=>{
      console.log('facebook',results)
    });
    
  }
  twitterlink(){
    this.twitterprov.twitterLink(this.twitter).subscribe(results=>{
      console.log('twitter',results)
    });
    
  }

  

 
}