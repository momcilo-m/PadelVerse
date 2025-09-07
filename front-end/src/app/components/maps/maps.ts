import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectComplexes } from '../../store/selectors/complex.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maps',
  imports: [CommonModule,GoogleMapsModule],
  templateUrl: './maps.html',
  styleUrl: './maps.scss'
})
export class Maps {

  @ViewChild('mapEl') mapElement: any;
  map!: google.maps.Map;
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 13;

  private subscription!: Subscription;

  store = inject<Store<AppState>>(Store)

  ngOnInit()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        (position)=>
        {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.map.setCenter(newCenter);
        }
      )
    }
  }

  ngAfterViewInit() {
    if (typeof google !== 'undefined' && google.maps) {
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: this.center,
        zoom: this.zoom,
        mapId: '3373fb5d8ce72adeb7c0cd49'
      });

      this.subscription! = this.store.select(selectComplexes).subscribe(
        object=>{
          
          object.forEach(complex=>{
            new google.maps.marker.AdvancedMarkerElement({
              map: this.map,
              position:{lat:complex.location.x, lng:complex.location.y}
            });
          })

        })
    } 
    else {
      console.error('Google Maps API not loaded!');
    }
  }
  
}