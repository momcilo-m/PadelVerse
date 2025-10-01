import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectComplexes } from '../../store/selectors/complex.selector';
import { map, Subscription } from 'rxjs';


@Component({
  selector: 'app-maps',
  imports: [CommonModule],
  templateUrl: './maps.html',
  styleUrl: './maps.scss'
})
export class Maps {

  @ViewChild('mapEl') mapElement: any;
  map!: google.maps.Map;
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 13;

  //private subscription!: Subscription;

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
        mapId: '8da2e5ef598c94e14d6d7495'
      });

       this.store.select(selectComplexes).pipe(
        map(complexes=>complexes.map(el=>({
              position:{lat:el.location.x,lng:el.location.y},
              label:el.name
            })
        )))
        .subscribe(marker=>
          marker.forEach(el=>{
            new google.maps.marker.AdvancedMarkerElement({
              map: this.map,
              position: el.position,
              content: this.createMarkerContent(el.label)
            });
          })
        )
        
    } 
    else {
      console.error('Google Maps API not loaded!');
    }
  }
 
  
  private createMarkerContent(label: string, description?: string): HTMLElement {
    // Container za marker i popup
    const container = document.createElement('div');
    container.style.position = 'relative';

    // Marker vizual
    const markerDiv = document.createElement('div');
    markerDiv.style.width = '20px';
    markerDiv.style.height = '20px';
    markerDiv.style.backgroundColor = 'red';
    markerDiv.style.borderRadius = '50%';
    markerDiv.style.cursor = 'pointer';
    container.appendChild(markerDiv);

    // Popup iznad markera
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.bottom = '25px';
    popup.style.left = '-50px';
    popup.style.width = '150px';
    popup.style.padding = '5px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.borderRadius = '5px';
    popup.style.display = 'none';
    popup.innerText = description || label;
    container.appendChild(popup);

    markerDiv.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
    });

    return container;
  }

}