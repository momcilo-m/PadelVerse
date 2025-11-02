import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { liveMatch } from '../../store/actions/match.action';

@Component({
  selector: 'app-matches',
  imports: [],
  templateUrl: './matches.html',
  styleUrl: './matches.scss',
})
export class Matches {


  store = inject<Store<AppState>>(Store)

  ngAfterViewInit() {
    this.store.dispatch(liveMatch())
  }
}
