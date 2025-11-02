import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { matchStats, matchStatsSuccess, selectMatch } from '../../store/actions/match.action';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { addEvent, loadEvetns } from '../../store/actions/events.action';

@Component({
  selector: 'app-match',
  imports: [],
  templateUrl: './match.html',
  styleUrl: './match.scss',
})
export class Match {

  private eventsSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService
  ) { }


  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.store.dispatch(selectMatch({ id: +this.id }))
    //this.store.dispatch(matchStats({ id: +this.id }))
    this.socketService.connect(this.id);
    this.store.dispatch(loadEvetns({ id: +this.id }))

    this.eventsSub = this.socketService.getAllEvents().subscribe(event => {
      console.log("U KOMPONENTI: ", event)
      if (event.type === "EVENT") {
        const { stats, ...cleanData } = event.data;
        this.store.dispatch(addEvent({ event: cleanData }));
        this.store.dispatch(matchStatsSuccess({ stats }))
      }
      else if (event.type === "CHAT") {
      }
    });
  }

  private id: string = "";

  store = inject<Store<AppState>>(Store)

}
