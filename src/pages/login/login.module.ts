import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProvider } from '../../providers/user';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    UserProvider,
  ]
})
export class LoginPageModule {}
