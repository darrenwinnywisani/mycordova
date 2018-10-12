import { CatalogProvider } from './../../providers/catalog/catalog';
import { ViewDetailsPage } from './../view-details/view-details';
import { AddDjPage } from './../add-dj/add-dj';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DjPROV: AddDjProvider, public alertCtrl: AlertController, private catProv: CatalogProvider) {
      this.DjPROV.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;
        console.log('response',this.filteredusers)})
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
  
}