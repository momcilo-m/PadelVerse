import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Complex } from '../components/complex/complex';
import { ComplexInterface } from '../models/complex.interface';

@Injectable({
  providedIn: 'root'
})
export class ComplexService {
  
  private http = inject(HttpClient)

  getComplex():Observable<ComplexInterface[]>
  {
    console.log("AAA")
    return this.http.get<ComplexInterface[]>("http://localhost:3000/complex",{withCredentials:true})
  }

}
