import { HomePage } from './../home/home';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController} from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  temparr=[];
  filteredusers=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private authPROV:AuthProvider,private profilePROV:ProfileProvider ) {
    this.profilePROV.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
      console.log('response',this.filteredusers)})
  }
  updateEmail(){

    const alert:Alert=this.alertCtrl.create({
  
      inputs:[{
        name:'oldEmail',
        placeholder:'enter old email',
     type:'email'
      },{
        name:'newEmail',
        placeholder:'enter new email',
        type:'email'
    
      }],
      buttons:[{
        text:'cancel',
      },{
        text:'save',
        handler:data =>{
          this.profilePROV.updateEmail(data.newEmail,data.oldEmail)
          .catch(error=>{
            console.log('error message from catch',error.message)
           let newAlert:Alert=this.alertCtrl.create({
             message:error.message
           })
           newAlert.present(); 
          })
        }
      }],
     
    })
    alert.present()
    }
 

}
