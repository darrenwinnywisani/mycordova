

import { AddDjPage } from './../pages/add-dj/add-dj';
import { SigninPage } from './../pages/signin/signin';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import * as firebase from 'firebase';
import { ProfilePage } from '../pages/profile/profile';
import { SplashPage } from '../pages/splash/splash';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any= SplashPage;

  constructor(public platform: Platform, private loadingCtrl:LoadingController,public statusBar: StatusBar, public splashScreen: SplashScreen,public alertCtrl :AlertController,private authPROV:AuthProvider) {
    // this.handleSplashScreen()
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
  }
}