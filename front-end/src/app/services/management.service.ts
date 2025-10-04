import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComplexGlobalStats, ComplexStatsMonth, ComplexStatsWeek } from '../models/complex.stats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  http = inject(HttpClient)

  getMonhtStats(id: number): Observable<ComplexStatsMonth> {
    return this.http.get<ComplexStatsMonth>(`http://localhost:3000/stats/month/${id}`)
  }

  getWeekStats(id: number): Observable<ComplexStatsWeek> {
    return this.http.get<ComplexStatsWeek>(`http://localhost:3000/stats/week/${id}`)
  }

  getGlobalStats(id: number): Observable<ComplexGlobalStats> {
    return this.http.get<ComplexGlobalStats>(`http://localhost:3000/stats/${id}`)
  }
}
