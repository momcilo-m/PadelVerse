import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComplexGlobalStats, ComplexStatsMonth, ComplexStatsWeek } from '../models/complex.stats';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  http = inject(HttpClient)
  private BASE = environment.apiUrl

  getMonhtStats(id: number): Observable<ComplexStatsMonth> {
    return this.http.get<ComplexStatsMonth>(`${this.BASE}/stats/month/${id}`, { withCredentials: true })
  }

  getWeekStats(id: number): Observable<ComplexStatsWeek> {
    return this.http.get<ComplexStatsWeek>(`${this.BASE}/stats/week/${id}`, { withCredentials: true })
  }

  getGlobalStats(id: number): Observable<ComplexGlobalStats> {
    return this.http.get<ComplexGlobalStats>(`${this.BASE}/stats/${id}`, { withCredentials: true })
  }
}
