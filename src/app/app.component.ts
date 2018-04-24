import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CreditoPage } from '../pages/Credito/Credito';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public menuCtrl: MenuController) {

    /* if (localStorage.getItem('user_data') != null) {
      this.rootPage = HomePage;
    } */

    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();

    switch (page) {
      case "home": {
        this.nav.setRoot(HomePage);
        break;
      }

      case "inserirCredito": {
        this.nav.push(CreditoPage);
        break;
      }

      case "newCard": {
        //this.nav.push(CadastrarPage);
        break;
      }
      case "sair": {
        this.nav.setRoot(LoginPage);
        break;
      }
    }

  }
}

