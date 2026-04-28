import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { liveMatch, selectMatch } from '../../store/actions/match.action';
import { selectMatches } from '../../store/selectors/match.selector';
import { MatchCard } from '../match-card/match-card';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-matches',
  imports: [MatchCard,AsyncPipe],
  templateUrl: './matches.html',
  styleUrl: './matches.scss',
})
export class Matches {


  store = inject<Store<AppState>>(Store)

  router = inject(Router)

  matches$ = this.store.select(selectMatches);

  matches1$ = this.store.select(selectMatches).subscribe((e)=>console.log(e));

  base = environment.apiUrl+'/photo/';
  
  ngAfterViewInit() {
    this.store.dispatch(liveMatch())
  }
   
  handleClick(id:number)
  {
    this.store.dispatch(selectMatch({id}))
    this.router.navigate([`/match/${id}`])
  }
}
