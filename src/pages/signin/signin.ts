import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from './../../providers/auth/auth';
import { SignupPage } from './../signup/signup';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController ,Loading} from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  private load:Loading;

  email:string;
  password:string;
  
  userForm:FormGroup;

    constructor(public navCtrl: NavController,
       private alertCtrl:AlertController,
       private loadingCtrl:LoadingController, 
       private authPROV:AuthProvider,public FB:FormBuilder ) {

        this.userForm= this.FB.group({
  
          email:['',Validators.compose([Validators.required,
          ])],

         password:['',Validators.compose([Validators.required,
         Validators.minLength(6)
          ])]

    })

        
    }
  
ionViewDidLoad() {
  console.log('ionViewDidLoad  SiginPage');
}
gotosignup(){
  this.navCtrl.push(SignupPage);
}

signIn(){
  if(!this.userForm.valid){
  console.log(this.userForm.valid)
  }else{
    let loading = this.loadingCtrl.create({
      content: 'Logging...'
    });
  
    loading.present();
    this.authPROV.signIn(this.userForm.value.email,this.userForm.value.password)
    .then(authData=>{
      loading.dismiss();
      this.load.dismiss().then(()=>{
        this.navCtrl.setRoot(HomePage);
      })
    },error=>{
      this.load.dismiss().then(()=>{
        const alert = this.alertCtrl.create({
          subTitle: 'Please check your user details or signup',
          buttons: [{
            text:'Ok',
            handler:data=>{
                
              }
            }]
        });
        alert.present();
      })
    })
    this.load=this.loadingCtrl.create();
    }
  }
 

  forgotPassword(){
      this.navCtrl.push(ResetpasswordPage);
    
  } 
  

}
