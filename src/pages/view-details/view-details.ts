import { BookingPage } from './../booking/booking';
import { HomePage } from './../home/home';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private DjPROV:AddDjProvider) {

    this.filteredusers=this.navParams.get('data');

    // this.DjPROV.getallusers().then((res: any) => {
    //   this.filteredusers = res;
    //   this.temparr = res;
    //   console.log('response',this.filteredusers)})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDetailsPage');
  }

  book(){
    this.navCtrl.push(BookingPage,{
      data:this.filteredusers
    })
    console.log('email',this.filteredusers)
  }

  goback(){
    this.navCtrl.setRoot(HomePage);
   }

}
