import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComplexInterface } from '../models/complex.interface';
import { Complex } from '../components/complex/complex';

@Injectable({
  providedIn: 'root'
})
export class ComplexService {
  
  private http = inject(HttpClient)

  getComplex():Observable<ComplexInterface[]>
  {
    return this.http.get<ComplexInterface[]>("http://localhost:3000/complex",{withCredentials:true})
  }

  getComplexById(id:number)
  {
    return this.http.get<ComplexInterface[]>(`http://localhost:3000/complex/${id}`,{withCredentials:true})
  }
}
