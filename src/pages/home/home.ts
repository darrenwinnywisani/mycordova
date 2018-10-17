import { CatalogProvider } from './../../providers/catalog/catalog';
import { ViewDetailsPage } from './../view-details/view-details';
import { AddDjPage } from './../add-dj/add-dj';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ViewDjPage } from '../view-dj/view-dj';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DjPROV: AddDjProvider, public alertCtrl: AlertController, private catProv: CatalogProvider) {
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
  addDJ(){
    this.navCtrl.push(AddDjPage);
  }
  sortedByGenre(){
    this.navCtrl.push(ViewDjPage);
  }
}