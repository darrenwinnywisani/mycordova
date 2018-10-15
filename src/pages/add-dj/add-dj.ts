import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import {Alert, IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import 'firebase/database';
import 'firebase/auth';
import { AddDjProvider } from '../../providers/add-dj/add-dj';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase, { User } from 'firebase/app';
import { ImageProvider } from '../../providers/image/image';
/**
 * Generated class for the AddDjPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-dj',
  templateUrl: 'add-dj.html',
})
export class AddDjPage {

  stageName:string='';
  email:string='';
  contact:string='';
  desc:string='';
  Location:string='';
  private load:Loading;
  private loading: any
  imgPreview = 'assets/imgs/chatterplace.png';
  regData = { avatar: '' };
  firebaseRef: firebase.database.Reference;
  picture: string = null;
  townships:string;
  cat:string;
  currentUser:User;
  genre:string = '';

  town=['Alice','Bellville','Benoni','Bethlehem','Bloemfontein','Boksburg','Brakpan' ,'Butterworth','Cape Town',
  'Carletonville','Constantia','Durban','East London','Emalahleni','Empangeni','Germiston','George','Giyani',
  'Graaff-Reinet','Grahamstown','Hopefield','Jagersfontein','Johannesburg','King William’s Town','Kimberley',
  'Klerksdorp','Kroonstad','Krugersdorp','Kuruman','Ladysmith','Lebowakgomo','Mahikeng','Mmabatho','Mthatha',
  'Musina','Nelspruit','Newcastle','Odendaalsrus','Oudtshoorn','Paarl','Parys','Phuthaditjhaba','Pinetown',
  'Pietermaritzburg','Polokwane','Port Elizabeth','Port Nolloth','Potchefstroom','Queenstown','Randburg',
  'Randfontein','Roodepoort','Rustenburg','Sasolburg','Secunda','Seshego','Sibasa','Simon’s Town','Soweto',
  'Springs','Stellenbosch','Swellendam','Thabazimbi','Uitenhage','Ulundi','Umlazi','Vanderbijlpark','Vereeniging',
  'Virginia','Welkom','Worcester','Zwelitsha', ];

  category =['House','Deep House','Hip Pop','Afro Pop','Soul','Rnb'];

  constructor(public navCtrl: NavController, private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,private djPROV:AddDjProvider, private imagePicker: ImagePicker,
    private base64: Base64, public imageProvider: ImageProvider,
    public camera: Camera, public alert: AlertController) {
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          console.log(user)
        this.currentUser=user;
        this.firebaseRef = firebase.database().ref(`/DjProfile/${user.uid}`)
        }
      })
      
  }

  
  updateDjD(email,stageName,desc,contact,Location,genre){
      this.djPROV.updateNames(this.email,this.stageName,this.desc,this.contact,this.Location,this.genre)
     
  }

  SaveUserData(){
  if(this.email === '' || this.stageName==='' || this.desc ==='' || this.contact ==='' || this.Location ===''|| this.genre===''  ){
    const alertName:Alert =this.alertCtrl.create({
    subTitle:'Please provide all your details',
    buttons:[{text:'ok'}]
        })
         alertName.present();
    }
  else{  

    this.djPROV.updateNames(this.email,this.stageName,this.desc,this.contact,this.Location,this.genre);
 
    const alertName:Alert =this.alertCtrl.create({
      subTitle:'You have successfully added your DJ page',
      buttons:[{text:'ok'}]
          })
     alertName.present();
     this.navCtrl.setRoot(HomePage);
  }
 
}

takePhoto() {
  this.camera.getPicture({
    quality: 95,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    saveToPhotoAlbum: true,
    targetHeight: 500,
    targetWidth: 500,
    allowEdit: true,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }).then((profilePicture) => {


    firebase.storage().ref(`/profilePictures/${this.currentUser.uid}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
    .then((savedProfilePicture) => {
    
      savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
      this.imgPreview = downloadedUrl;
        this.firebaseRef.child('/profile').set(downloadedUrl)
     
      })
     
  
      })

  //   this.picture = profilePicture;
  // firebase.storage().ref('profilePictures/picture.png').putString(profilePicture, 'base64', { contentType: 'image/png' })
  // .then((savedProfilePicture) => {
  
  //   savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
  //     this.picture =downloadedUrl
  //     this.imgPreview = downloadedUrl
  //     this.firebaseRef.child('/profile').set(downloadedUrl)
    
  //   })
   

  //   })
   
  }, err => {
    console.log('érror' + JSON.stringify(err))
  })

 }
 getPhoto() {
  let options = {
    maximumImagesCount: 1
  };
  this.imagePicker.getPictures(options).then((results) => {
    const newAlert: Alert = this.alert.create({
      message: results,
      buttons: [{ text: 'ok', role: 'cancel' }]
    })
    newAlert.present()

    const pic = firebase.storage().ref('profilePictures/picture.png')
    pic.putString(results[0], 'base64', { contentType: 'image/png' })
    for (var i = 0; i < results.length; i++) {
      this.imgPreview = results[i];
      this.saveImage(this.imgPreview);

      // this.base64.encodeFile(results[i]).then((base64File: string) => {

      //   this.regData.avatar = base64File;


      // }, (err) => {
      //   console.log(err);
      // });
    }
  }, (err) => { });




  // const optionss: CameraOptions = {

  // }
  // this.camera.getPicture(optionss).then((imageData)=>{
  //   this.imgPreview = imageData
  //   this.saveImage(imageData);
  // },(err)=>{
  //   console.log(err)
  // })

  }
  saveImage(results) {
    this.imageProvider.saveImage(results)
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Submitting...'
    });

    this.loading.present()

  }

}