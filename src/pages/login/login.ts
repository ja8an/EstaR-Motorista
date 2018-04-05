import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {
    username: null,
    password: null
  }

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.api
      .login(this.user.username, this.user.password)
      .then(result => {
        this.navCtrl.setRoot(HomePage);
      }).catch(err => {
        console.error(err);
      });
  }

}