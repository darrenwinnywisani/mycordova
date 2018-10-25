import { AuthProvider } from './../../providers/auth/auth';
import { ProfilesPage } from './../profiles/profiles';
import { ProfilePage } from './../profile/profile';
import { CatalogProvider } from './../../providers/catalog/catalog';
import { ViewDetailsPage } from './../view-details/view-details';
import { AddDjPage } from './../add-dj/add-dj';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ViewDjPage } from '../view-dj/view-dj';
import { SigninPage } from '../signin/signin';
import { auth } from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  Name: string;
  DjProfile: any;
  stageNameList: Array<any>;
  isSearchbarOpened=false;
  filteredusers=[];
  temparr=[];
  viewDetails=[];
  genre=[];
  category=[];
  arrGenre=[];
  genres:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DjPROV: AddDjProvider, private authPROV:AuthProvider, public alertCtrl: AlertController, private catProv: CatalogProvider) {
      this.DjPROV.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;
        console.log('response',this.filteredusers)});
        this.genre=[
          {music:'Electronic music',pic:'electronic.png'},
          {music:'Hip hop',pic:"hip hop.png"},
          {music:'Gqom',pic:"gqom.png"},
          {music:'Deep House',pic:"deep.png"},
          {music:'Kwaito',pic:"kwaito.png"},
          {music:'RnB',pic:"rnb.png"},
          {music:'Commercial House',pic:"commercial.png"},
          {music:'Traditional music',pic:"traditional.png"},
          {music:'Jazz',pic:"JAZZ.png"},
          {music:'Afro Pop/Soul',pic:"afro.png"}
       ];
  }

  searchDJ(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredusers = this.filteredusers.filter((v) => {
      if ((v.stageName.toLowerCase().indexOf(q.toLowerCase()) > -1)||(v.Location.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
        return true;
      }
      return false;
    })
  }
  gotoViewDetails(i:number){
    this.viewDetails.push(this.filteredusers[i])
    this.navCtrl.setRoot(ViewDetailsPage,{
    data:this.viewDetails
    });
  }
  // addDJ(){
  //   this.navCtrl.push(ProfilesPage);
  // }
  // profile(){
  //   this.navCtrl.push(ProfilePage);
  // }
  sortedByGenre(i:number){
    this.category=[];
    this.category = ['Electronic music','House','Hip Pop','Gqom','Kwaito','RnB','Deep House','Commercial House','jazz','Soul','Accapella','Rock','Disco','Reggae','Gospel'];
    this.genres=this.category[i];
 
    this.navCtrl.push(ViewDjPage,{data:this.genres});
  }
  viewDJ(i:number){
    this.viewDetails=[];
    this.viewDetails.push(this.filteredusers[i]);
    this.navCtrl.push(ViewDetailsPage,{
      data:this.viewDetails
    });
  }

  addDJ(){
    this.navCtrl.push(AddDjPage);
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }

  signoutConfirm(){
    let alert = this.alertCtrl.create({
      subTitle:'Are you sure you want to signout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authPROV.signOut().then(() => {
              this.authPROV.signOut();
              this.navCtrl.setRoot(SigninPage);
            });
          }
        }
      ]
    });
    alert.present();
  }
}