import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation
} from '@ionic-native/google-maps';
import { ApiProvider } from '../../providers/api/api';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 

  @ViewChild('mapcanvas') mapElement: ElementRef;
  image: any
  map: any;
  pointersMap: any
  cars : any
  qtdHoras: any = null
  tempoFormatado: any = ''
  public placa: any

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public menu: MenuController, public api: ApiProvider) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    this.image = "assets/imgs/celta.png"
     //let user = JSON.parse(window.sessionStorage.getItem("-USUARIO"))
    this.cars = []
    this.cars.push({
      nome: "Celta",
      imagem: "assets/imgs/celta.png",
      selected: true
    },{
      nome:"Corsa",
      imagem: "assets/imgs/corsa.png",
      selected: false
    })
    this.pointersMap = []
    this.pointersMap.push({
      id: "1",
      title: "Shopping Curitiba",
      icon: "Blue",
      animation: "DROP",
      position: {
        lat: -25.4429985,
        lng: -49.2819486
      }
    },
  {
    id: "2",
      title: "Praça do Japão",
      icon: "Blue",
      animation: "DROP",
      position: {
        lat: -25.4455213,
        lng: -49.2874269
      }
  })
    this.api.showCar().then(data => {
      this.image = data
    }).catch(err => console.error(err))
    console.log('Loading map');
    this.loadMap();
  }

  loadMap() {
    
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -25.4429985,
          lng: -49.2819486
        },
        zoom: 18,
        tilt: 0
      },
      controls: {
        compass: false,
        indoorPicker: true,
        mapToolbar: false,
        myLocation: true,
        myLocationButton: true,
        zoom: true
      },
      preferences: {
        padding: {
          top: 50
        }
      },
      gestures: {
        rotate: true,
        tilt: false,
        zoom: true,
      },
      styles: [
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    };

    this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        
        // Now you can use all methods safely.
        
        for(let data of this.pointersMap){
          this.map.addMarker({
            title: data.title,
            icon: data.icon,
            animation: data.animation,
            position: {
              lat: data.position.lat,
              lng: data.position.lng
            }
          })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  if(this.placa != null){
                    this.placa = null
                  }
                  else{
                    this.placa = data.id
                  }
                });
            });
        }

      });
  }
  mostrarCarros(){
    if(this.tempoFormatado == ''){
      
    let options = {
      title: 'Escolha o carro desejado',
      inputs: [],
      buttons: [{
        text: "Selecionar",
        handler: data => {
          this.image = data
        }
      },{
        text: "Cancelar",
        handler: () => {
          alertr.dismiss();
        }
      }
      ]      
    }
    for(let car of this.cars){
      options.inputs.push({
        type: 'radio',
        label: car.nome,
        value: car.imagem,
        checked: car.selected
      })
    }
    let alertr = this.alertCtrl.create(options);
    alertr.present()
    }else{
      let alertr = this.alertCtrl.create({
        title: "Aviso",
        message: "Um veículo ja esta no EstaR, por favor aguarde o tempo acabar!",
        buttons: ['Entendi']
      });
      alertr.present()
    }
  }


  SetTime(tempo){
  if(this.qtdHoras == null){
      tempo = tempo * 60
      this.qtdHoras = tempo
      this.tempoFormatado = "02:00"
      const timer = setInterval(() => {
        if (this.qtdHoras == 0) {
          this.qtdHoras = null
          this.tempoFormatado = ''
          clearInterval(timer)
        }
        else{
          this.qtdHoras = this.qtdHoras - 1 
          let horas = (this.qtdHoras / 60).toString().substring(0, 1)
          let minutos = (this.qtdHoras % 60).toString()
          this.tempoFormatado = "0" + horas + ":" + (minutos.length == 1 ? "0" + minutos : minutos) 
        }
       
      }, 100000)     
    }
    else{
      console.log("Sai do if oloco")
    }
    
   

  }
  

  

}
