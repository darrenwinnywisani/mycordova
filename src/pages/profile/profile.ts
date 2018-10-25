
import { SigninPage } from './../signin/signin';
import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert,Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import firebase, { User} from 'firebase/app';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import 'firebase/database';
import 'firebase/auth';
import { AddDjProvider } from '../../providers/add-dj/add-dj';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImageProvider } from '../../providers/image/image';
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
  // temparr=[];
  // filteredusers=[];


  
  public userForm:FormGroup;
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
  


  constructor(public navCtrl: NavController, private profilePROV:ProfileProvider, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider,public FB:FormBuilder,
    private djPROV:AddDjProvider, private imagePicker: ImagePicker,
    private base64: Base64, public imageProvider: ImageProvider,
    public camera: Camera, public alert: AlertController) {

            this.userForm= this.FB.group({
 
            email:['',Validators.compose([Validators.required,
            ])],
       
        })

     
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
            console.log(user)
          this.currentUser=user;
          this.firebaseRef = firebase.database().ref(`/DjProfile/${user.uid}`)
          }
        })
        
    }
      
      

  
   signUp(){
     if(!this.userForm.valid){
     console.log(this.userForm.valid);
     }else{
     this.authPROV.signUp(this.userForm.value.email,this.userForm.value.password)
     .then(authPROV =>{
     this.load.dismiss().then(()=>{


     this.profilePROV.UserDetails(this.userForm.value.firstName, this.userForm.value.lastName) 
     .then(() => {
     this.userForm.reset();
       })
       const alert = this.alertCTR.create({
        subTitle:"your Email has been Updated",
        buttons: [{
          text:'Ok',
          handler:data=>{
            this.navCtrl.setRoot(HomePage)
            }
          }]
      })
       alert.present();
    
    })
      },error=>{
        this.load.dismiss().then(()=>{
          
        const alert = this.alertCTR.create({
        subTitle:'your Email has been Updated',
        buttons:[{text:'ok',role:'cancel'}]
          })


          alert.present();
        })
      })
      this.load = this.loadingCTR.create();
      this.load.present();
    }
  }
  

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
            return {'equalTo': {isValid}};
        else
            return null;
    };
}

gotohome(){
  this.navCtrl.push(HomePage);
}



  updateDjD(email,stageName,desc,contact,Location,genre){
      this.djPROV.updateNames(this.email,this.stageName,this.desc,this.contact,this.Location,this.genre)
     
  }

  SaveUserData(){
  if(this.email === '' || this.stageName==='' || this.desc ==='' || this.contact ==='' || this.Location ===''|| this.genre===''  ){
    const alertName:Alert =this.alertCTR.create({
    subTitle:'Please provide all your details',
    buttons:[{text:'ok'}]
        })
         alertName.present();
    }
  else{  

    this.djPROV.updateNames(this.email,this.stageName,this.desc,this.contact,this.Location,this.genre);
 
    const alertName:Alert =this.alertCTR.create({
      subTitle:'your DJ page has been Updated ',
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
    targetHeight: 800,
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

     
    }
  }, (err) => { });


  }
  saveImage(results) {
    this.imageProvider.saveImage(results)
  }

  showLoader() {
    this.loading = this.loadingCTR.create({
      content: 'Submitting...'
    });

    this.loading.present()

  }



//     this.profilePROV.getallusers().then((res: any) => {
//       this.filteredusers = res;
//       this.temparr = res;
//       console.log('response',this.filteredusers)})
//   }
//   updateEmail(){
//     const alert:Alert=this.alertCtrl.create({
  
//       inputs:[{
//         name:'oldEmail',
//         placeholder:'enter old email',
//      type:'email'
//       },{
//         name:'newEmail',
//         placeholder:'enter new email',
//         type:'email'
    
//       }],
//       buttons:[{
//         text:'cancel',
//       },{
//         text:'save',
//         handler:data =>{
//           this.profilePROV.updateEmail(data.newEmail,data.oldEmail)
//           .catch(error=>{
//             console.log('error message from catch',error.message)
//            let newAlert:Alert=this.alertCtrl.create({
//              message:error.message
//            })
//            newAlert.present(); 
//           })
//         }
//       }],
     
//     })
//     alert.present()
//     }
    signoutConfirm(){
      let alert = this.alertCTR.create({
        title: 'Sign Out',
        message: 'Are you sure you want to signout?',
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
              console.log('Clicked signout button');
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
