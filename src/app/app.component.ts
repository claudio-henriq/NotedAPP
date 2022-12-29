import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../providers/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private userProvider: UserProvider,
  ) {
    platform.ready().then(() => {
      this.storage.ready().then(() =>{
        this.storage.get('user').then(data => {
          if(data){
            this.rootPage = HomePage;
          }else{
            this.rootPage = LoginPage;
          }
        });
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout(){
    this.userProvider.clearUser();
    this.nav.setRoot(LoginPage);
  }
}

