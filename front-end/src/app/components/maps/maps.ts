import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectComplexes } from '../../store/selectors/complex.selector';
import { map, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';


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

  private map_id = environment.mad_id;
  private api = environment.apiUrl;
  private client = environment.clinet;
  //private subscription!: Subscription;

  store = inject<Store<AppState>>(Store)

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
        //mapId: '8da2e5ef598c94e14d6d7495'
        mapId: this.map_id
      });

      this.store.select(selectComplexes).pipe(
        map(complexes => complexes.map(el => ({
          position: { lat: el.location.x, lng: el.location.y },
          label: el.name,
          photo: el.photo,
          id: el.id
        })
        )))
        .subscribe(marker =>
          marker.forEach(el => {
            new google.maps.marker.AdvancedMarkerElement({
              map: this.map,
              position: el.position,
              content: this.createMarkerContent(el.label, el.photo, el.id)
            });
          })
        )

    }
    else {
      console.error('Google Maps API not loaded!');
    }
  }


  private createMarkerContent(label: string, photo: string, id: number, description?: string): HTMLElement {
    // Container za marker i popup
    const container = document.createElement('div');
    container.style.position = 'relative';

    // Marker vizual
    const markerDiv = document.createElement('span');
    markerDiv.classList.add('material-icons');
    markerDiv.textContent = 'sports_tennis';
    markerDiv.style.fontSize = '32px';
    markerDiv.style.color = 'green';
    markerDiv.style.cursor = 'pointer';
    container.appendChild(markerDiv);


    // Popup iznad markera
    const popup = document.createElement('div');
    popup.className = "popup";

    //Slika u pop-up
    const img = document.createElement('img');
    img.src = this.api + "/photo/" + photo;
    img.style.height = "50px"
    img.style.width = "75px"

    //Text
    const link = document.createElement("a");
    link.innerText = label;
    link.href = this.client + `/complex/${id}`;
    link.style.textDecoration = 'none';
    link.style.color = "green"

    //popup.innerText = description || label;
    popup.appendChild(img);
    popup.appendChild(link);
    container.appendChild(popup);

    markerDiv.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
    });

    return container;
  }

}