import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';  
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
  constructor( public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public toast: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    //public net: Network,
    //console.log(net)
    
    let showmsg = this.toast.create({
      message: 'Verifique sua conxão com a internet ',
      position: 'bottom'
    });
    
    
  
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
            console.log(err)
            this.aguarde = false;
            this.erro = "Login e/ou senha inválidos!"
            
        })
               
    }
  }

}

