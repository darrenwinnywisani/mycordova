import { EmailComposer } from '@ionic-native/email-composer';
import { Injectable } from '@angular/core';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor(private email: EmailComposer) {
    console.log('Hello EmailProvider Provider');
  }
sendEmail(to:string,subject:string,body:string) : void
{
// Use the plugin isAvailable method to check whether
// the user has configured an email account
this.email.isAvailable()
.then((available: boolean) =>
{

// Check that plugin has been granted access permissions to
// user's e-mail account
this.email.hasPermission()
.then((isPermitted : boolean) =>
{

   // Define an object containing the
   // keys/values for populating the device
   // default mail fields when a new message
   // is created
   let email : any = {
      app 		: 'vinylDJ app',
      to 			: to,
      subject : subject,
      body 		: body
   };

   // Open the device e-mail client and create
   // a new e-mail message populated with the
   // object containing our message data
   this.email.open(email);
  })
  .catch((error : any) =>
  {
  console.log('No access permission granted');
  console.dir(error);
  });
  })
  .catch((error : any) =>
  {
  console.log('User does not appear to have device e-mail account');
  console.dir(error);
  });
  }
}
