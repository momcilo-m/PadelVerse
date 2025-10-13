import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private http = inject(HttpClient)

  private BASE = environment.apiUrl;
  private STRIPE_KEY = environment.stipe_key

  private stripe = loadStripe(this.STRIPE_KEY);

  checkout_session(complex: number, court: number, count: number) {
    return this.http.get<{ id: string }>(`${this.BASE}/booking/checkout-session?complex=${complex}&court=${court}&count=${count}`, { withCredentials: true })
  }


  async checkout(id: string) {
    let st = await this.stripe;

    if (!st) throw Error("Problem With stripe");

    st.redirectToCheckout({ sessionId: id })
  }
}
