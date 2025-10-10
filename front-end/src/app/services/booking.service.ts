import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private http = inject(HttpClient)

  private stripe = loadStripe("pk_test_51S6EVACq02uHmIrC98mVnThKAvZT6PJ3zGpZuhow7AVExgJSuzPAWkp2MfCXGC1VnldB4BloLuKWZh9l9d8LnR6I00UC8jbVRS");

  // checkout_session(complex: number, court: number, count: number) {
  //   this.http.get(`http://localhost:4200/booking/checkout-session?complex=${complex}&court=${court}&count=${count}`, { withCredentials: true })
  // }

  checkout_session(complex: number, court: number, count: number) {
    return this.http.get<{ id: string }>(`http://localhost:3000/booking/checkout-session?complex=${complex}&court=${court}&count=${count}`, { withCredentials: true })
  }


  async checkout(id: string) {
    let st = await this.stripe;

    if (!st) throw Error("Problem With stripe");

    st.redirectToCheckout({ sessionId: id })
  }
}
