import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, retry, throwError } from 'rxjs';
import { ComplexInterface } from '../models/complex.interface';
import { Complex } from '../components/complex/complex';
import { CreateComplex } from '../models/create.complex.interface';

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

  getComplexByOwner(owner: number) {
    return this.http.get<ComplexInterface[]>(`http://localhost:3000/complex?owner=${owner}`)
  }

  createComplex(complex: CreateComplex): Observable<ComplexInterface> {
    return this.http.post<ComplexInterface>(`http://localhost:3000/complex`, complex, { withCredentials: true })
  }

  createCourt(court: CourtInterface): Observable<CourtInterface> {
    return this.http.post<CourtInterface>(`http://localhost:3000/complex/courts`, court, { withCredentials: true })
  }

  editComplex(complex: CreateComplex, id: number): Observable<CreateComplex> {
    return this.http.patch<CreateComplex>(`http://localhost:3000/complex/${id}`, complex, { withCredentials: true })
  }

  uploadComplexImage(file: File, id: number): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>(`http://localhost:3000/complex/photo/${id}`, formData, { withCredentials: true });
  }
}
