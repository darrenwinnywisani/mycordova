import { ProfilePage } from './../profile/profile';
import { AddDjPage } from './../add-dj/add-dj';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  constructor(public navCtrl: NavController, public alert: AlertController,private authPROV:AuthProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }
 
}
