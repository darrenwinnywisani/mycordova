import { EmailProvider } from './../../providers/email/email';
import { BookingProvider } from './../../providers/booking/booking';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Alert,Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { SigninPage } from '../signin/signin';


/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  load: any;
  userForm:FormGroup;
  public form  : FormGroup;
  Name:string;
  email:string;
  Location:string;
  stagename:string;
  event:string;
  Date:string;
  Time:string;
  Number:string;
  townships:string;
  Booking:firebase.database.Reference;
  currentUser:User;
  message:string;
  sentEmail:any;
  sname:string;
  details:any;
  town=['Alice','Bellville','Benoni','Bethlehem','Bloemfontein','Boksburg','Brakpan' ,'Butterworth','Cape Town',
  'Carletonville','Constantia','Durban','East London','Emalahleni','Empangeni','Germiston','George','Giyani',
  'Graaff-Reinet','Grahamstown','Hopefield','Jagersfontein','Johannesburg','King William’s Town','Kimberley',
  'Klerksdorp','Kroonstad','Krugersdorp','Kuruman','Ladysmith','Lebowakgomo','Mahikeng','Mmabatho','Mthatha',
  'Musina','Nelspruit','Newcastle','Odendaalsrus','Oudtshoorn','Paarl','Parys','Phuthaditjhaba','Pinetown',
  'Pietermaritzburg','Polokwane','Port Elizabeth','Port Nolloth','Potchefstroom','Queenstown','Randburg',
  'Randfontein','Roodepoort','Rustenburg','Sasolburg','Secunda','Seshego','Sibasa','Simon’s Town','Soweto',
  'Springs','Stellenbosch','Swellendam','Thabazimbi','Uitenhage','Ulundi','Umlazi','Vanderbijlpark','Vereeniging',
  'Virginia','Welkom','Worcester','Zwelitsha', ];
  
  constructor( private _EMAIL: EmailProvider,public navCtrl: NavController, public navParams: NavParams,
    public alertCTR: AlertController,private FB:FormBuilder, private authPROV: AuthProvider,
     private booking:BookingProvider,private loadingCTR:LoadingController ) {
     this.details=this.navParams.get('data');
     this.sname=this.details[0].stageName;
     this.sentEmail=this.details[0].email;
     
     console.log('sent', this.details);
     console.log('sent', this.sname);
     console.log('sent', this.sentEmail);
     this.userForm= this.FB.group({

        Name:['',Validators.compose([Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*')])],

        email:['',Validators.compose([Validators.required,
        ])],

        Location:['',Validators.compose([Validators.required,
        ])],

        event:['',Validators.compose([Validators.required])],
  
        Date:['',Validators.compose([Validators.required])],
  
        Time:['',Validators.compose([Validators.required,
        Validators.pattern('[0-9]*')
         ])],

        Number:['',Validators.compose([Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*')
         ])],
  })
  

  }

  
  submit(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
      this.currentUser=user;
      this.Booking= firebase.database().ref(`/Booking/${user.uid}`);
      this.booking.BookingDetails(this.userForm.value.Name,this.userForm.value.email,this.userForm.value.Location,
        this.userForm.value.event,this.userForm.value.Date,this.userForm.value.Time,this.userForm.value.Number)
        this.message='Hello '+this.Name;
        this.sendMessage();
        this.navCtrl.setRoot(HomePage)
      }else{
        const alert = this.alertCTR.create({
          subTitle: 'Please sign in first to make a booking',
          buttons: [{
            text:'Cancel',
            role:'cancel'},{
            text:'Ok',
            handler:data=>{
                 this.navCtrl.push(SigninPage);
              }
            }]
        });
        alert.present();
      }
  })
 }
 sendMessage() : void
 {
     this.message='Hello '+this.sname+' \n'+' '+this.Name+' '+this.Location+''+this.event+' '+this.Date+' '+this.Time;
     this._EMAIL.sendEmail(this.sentEmail, this.event, this.message);
 }

}