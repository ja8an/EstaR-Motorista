import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Label } from 'ionic-angular/components/label/label';
import { HtmlParser } from '@angular/compiler';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private aguarde : boolean = false 
  private senha : string
  private login : string
  private erro : string
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    // If we navigated to this page, we will have an item available as a nav param
  }
    
    Logar(){
      if (this.senha == undefined || this.login == undefined){
          this.erro = "Preencha todos os campos!"
      }
      else{
          this.aguarde = true
          this.erro = ""
          this.api.login(this.login, this.senha).then(data => {
            localStorage.setItem("-USUARIO", JSON.stringify(data))
            this.navCtrl.setRoot(HomePage) 
          }).catch(err => {
            this.aguarde = false;
            this.erro = "Login e/ou senha inválidos!"
            
        })
               
    }
  }

}

