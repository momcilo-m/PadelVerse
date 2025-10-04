import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { ComplexInterface } from '../models/complex.interface';
import { Complex } from '../components/complex/complex';

@Injectable({
  providedIn: 'root'
})
export class ComplexService {

  private http = inject(HttpClient)

  getComplex(): Observable<ComplexInterface[]> {
    return this.http.get<ComplexInterface[]>("http://localhost:3000/complex", { withCredentials: true })
  }

  getComplexById(id: number): Observable<ComplexInterface> {
    return this.http.get<ComplexInterface>(`http://localhost:3000/complex/${id}`, { withCredentials: true })
  }

  getAvailableCourt(id: number, date: string, time: string, count: number) {
    console.log(id, date, time, count)
    return this.http.get<AvalaibleCourtsInterface>(`http://localhost:3000/complex/free/${id}?date=${date}&time=${time}&count=${count}`)
  }

  getWeather(date: string, time: string, location: string): Observable<ForecastResponse> {
    let base = "http://api.weatherapi.com/v1";
    let key = "29b677f206f94d6295a175818251009";

    if (location === "[undefined,undefined]") {
      return throwError(() => new Error("Bad request: location is required"));
    }
    return this.http.get<ForecastResponse>(`${base}/forecast.json?key=${key}&q=${location}&dt=${date}&hour=${time}`)
  }

  checkout(complex: number, court: number, count: number) {
    return this.http.get<{ id: string }>(`http://localhost:3000/booking/checkout-session?complex=${complex}&court=${court}&count=${count}`, { withCredentials: true })
  }

  getComplexByOwner(owner: number) {
    return this.http.get<ComplexInterface[]>(`http://localhost:3000/complex?owner=${owner}`)
  }
}
