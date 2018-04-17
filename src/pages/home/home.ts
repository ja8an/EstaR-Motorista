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
import { Geolocation } from '@ionic-native/geolocation';



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
  qtdHoras: any

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public menu: MenuController, public api: ApiProvider) {
    menu.enable(true);
  }

  ionViewDidLoad() {
     //let user = JSON.parse(window.sessionStorage.getItem("-USUARIO"))
    this.cars = []
    this.cars.push({
      nome: "Celta"
    },{
      nome:"Gol"
    })
    this.pointersMap = []
    this.pointersMap.push({
      id: "1",
      title: "Ponto 1",
      icon: "Blue",
      animation: "DROP",
      position: {
        lat: -25.4429985,
        lng: -49.2819486
      }
    })
    this.api.showCar().then(data => {
      this.image = data
    }).catch(err => console.error(err))
    console.log('Loading map');
    this.loadMap();
  }

  loadMap() {
    let alertr = this.alertCtrl.create({
      title: 'Corfirmar a quantidade de horas',
      message: 'Quantas horas você gostaria de estacionar?',
      buttons: [
        {
          text: 'Uma hora',
          handler: () => {
            this.qtdHoras = 1
          }
        },
        {
          text: 'Duas horas',
          handler: () => {
            this.qtdHoras = 2
          }
        }
      ],
      
    });
    
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
        console.log('Map is ready!');

        // Now you can use all methods safely.
        
        for(let data of this.pointersMap){
          console.log(data)
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
                  alertr.present().then(() => {
                    alert(this.qtdHoras)
                  })
                  
                });
            });
        }

      });
  }

}
