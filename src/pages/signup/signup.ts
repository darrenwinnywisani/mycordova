import { SigninPage } from './../signin/signin';
import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert,Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import firebase, { User} from 'firebase/app';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userForm:FormGroup;

  firstName:string;
  lastName:string;
  email:string;
  password:string;
  private load:Loading;
  Location:string;

  townships:string;
  
  town=['Alice','Bellville','Benoni','Bethlehem','Bloemfontein','Boksburg','Brakpan' ,'Butterworth','Cape Town',
  'Carletonville','Constantia','Durban','East London','Emalahleni','Empangeni','Germiston','George','Giyani',
  'Graaff-Reinet','Grahamstown','Hopefield','Jagersfontein','Johannesburg','King William’s Town','Kimberley',
  'Klerksdorp','Kroonstad','Krugersdorp','Kuruman','Ladysmith','Lebowakgomo','Mahikeng','Mmabatho','Mthatha',
  'Musina','Nelspruit','Newcastle','Odendaalsrus','Oudtshoorn','Paarl','Parys','Phuthaditjhaba','Pinetown',
  'Pietermaritzburg','Polokwane','Port Elizabeth','Port Nolloth','Potchefstroom','Queenstown','Randburg',
  'Randfontein','Roodepoort','Rustenburg','Sasolburg','Secunda','Seshego','Sibasa','Simon’s Town','Soweto',
  'Springs','Stellenbosch','Swellendam','Thabazimbi','Uitenhage','Ulundi','Umlazi','Vanderbijlpark','Vereeniging',
  'Virginia','Welkom','Worcester','Zwelitsha', ];



  constructor(public navCtrl: NavController, private profilePROV:ProfileProvider, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider,public FB:FormBuilder) {

            this.userForm= this.FB.group({
  
              firstName:['',Validators.compose([Validators.required,
              Validators.minLength(3),
              Validators.pattern('[a-zA-Z]*')])],
   
            lastName:['',Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.pattern('[a-zA-Z]*')
            ])],
 
            email:['',Validators.compose([Validators.required,
            ])],

        
            password:['',Validators.compose([Validators.required,
            Validators.minLength(6)
            ])],
   
            confirm:['',Validators.compose([Validators.required,
            Validators.minLength(6),
            this.equalto('password')
           ])]
       
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
       let alert:Alert =this.alertCTR.create({
        message:"Congratulations",
        buttons:[{
          text:'OK',
          handler:data=>{
          this.navCtrl.setRoot(SigninPage)
          }
      
        }]
       })
       alert.present();
    
    })
      },error=>{
        this.load.dismiss().then(()=>{
        const alert :Alert = this.alertCTR.create({
        message:error.message,
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

}
