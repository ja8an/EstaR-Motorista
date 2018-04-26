import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
    selector: 'page-home',
    templateUrl: 'Credito.html'
  })
  export class CreditoPage {

    constructor(public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public toastCrtl: ToastController){
        menu.enable(true);
    }

    abrirInput(){

        let alert = this.alertCtrl.create({
            title: 'Valor',
            message: "Digite o valor desejado para inserção de créditos",
            inputs: [
              {
                name: 'Valor',
                placeholder: 'Digite o valor desejado'
              }
            ],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                  alert.dismiss();
                }
              },
              {
                text: 'Confirmar',
                handler: data => {
                  let valor = window.sessionStorage.getItem("-VALOR")
                  console.log(data)
                  window.sessionStorage.setItem("-VALOR", (parseFloat(data.Valor) + parseFloat(valor)).toString())
                  let toast = this.toastCrtl.create({
                    message: 'Valor inserido com sucesso!',
                    duration: 3000,
                    position: 'middle'
                  });
                  toast.present()
                  alert.dismiss();
                }
              }
            ]
          });
          alert.present();
    }
  }


