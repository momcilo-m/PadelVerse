import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private http = inject(HttpClient)

  checkout(complex:number,court:number,count:number)
  {
    this.http.get(`http://localhost:4200/booking/checkout-session?complex=${complex}&court=${court}&count=${count}`)
  }

}
