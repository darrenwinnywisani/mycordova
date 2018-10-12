import { OnboardingPage } from './../pages/onboarding/onboarding';
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



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any=OnboardingPage;
   isUser: any;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(public platform: Platform, private loadingCtrl:LoadingController,public statusBar: StatusBar, public splashScreen: SplashScreen,public alertCtrl :AlertController,private authPROV:AuthProvider) {
    this.handleSplashScreen()
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
    

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log("firebase user not available",user)
        this.isUser = false;
        this.rootPage = HomePage;

       this.pages = [
          { title: 'home', component: HomePage, icon:'home' },
          { title: 'Signin', component:SigninPage ,icon:'log-in'},
          { title: 'Sign-up', component: SignupPage,icon:'person-add'}
        ];
        unsubscribe();
      }
       else {
        console.log("firebase user available",user)
        this.isUser = true;
        this.rootPage = HomePage;
       
        this.pages = [
          { title: 'Home', component: HomePage, icon:'home' },
          { title: 'Profile', component:ProfilePage,icon:'person' },
          { title: 'Add DJ', component:AddDjPage, icon:'add' },
          { title: 'Sign-out',component:null,icon:'log-out'}
         

         
        
        ];
        unsubscribe();
      
      }
    });

  
}
signoutConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Sign Out',
    message: 'Are you sure you want to signout?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.nav.setRoot(HomePage);
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Clicked signout button');
          this.authPROV.signOut().then(() => {
            this.authPROV.signOut();
          
            this.nav.setRoot(HomePage);
            location.reload()
            
          });
         
        }
      }
    ]
  });
  alert.present();
}


openPage(page) {
  switch (true) {

    case ((page.title == 'Sign-out')): {


      
      console.log('Clicked signout button');

      this.signoutConfirm();
     
    }
        break;

    default: {
      this.nav.push(page.component);
    }
        break;
}

}

presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img src="assets/img/gif.gif" />`,
    duration: 5000
  });

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
}
async handleSplashScreen(): Promise<void> {
  try {
    // wait for App to finish loading
    await this.platform.ready()
  } catch (error) {
    console.error('Platform initialization bug')
  }
  }
}