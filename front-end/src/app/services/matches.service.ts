import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { MatchInterface } from '../models/match.interface';
import { MatchStatsInterface } from '../models/match.stats.interface';
import { MatchEventInterface } from '../models/match.event.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private http = inject(HttpClient)

  private BASE = environment.apiUrl

  getLiveMatches(): Observable<MatchInterface[]> {
    return this.http.get<MatchInterface[]>(`${this.BASE}/match/live`)
  }

  getMatchById(id: number): Observable<{ match: MatchInterface, stats: MatchStatsInterface }> {
    return this.http.get<{ match: MatchInterface, stats: MatchStatsInterface }>(`${this.BASE}/match/${id}`)
  }

  getStats(id: number): Observable<MatchStatsInterface> {
    return this.http.get<MatchStatsInterface>(`${this.BASE}/match/${id}/stats`);
  }

  getEvents(id: number): Observable<MatchEventInterface[]> {
    return this.http.get<MatchEventInterface[]>(`${this.BASE}/match/${id}/events`);
  }

}
